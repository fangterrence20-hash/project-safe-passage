import { createHash } from "node:crypto";
import { invokeLLM } from "./_core/llm";

export type DynamicLanguage = "EN" | "FR" | "SW";

type TranslationUnit = { id: string; title: string; summary: string; metadata?: string };
type TranslationResult = { id: string; title: string; summary: string; metadata?: string };

const cache = new Map<string, { expiresAt: number; items: TranslationResult[] }>();
const languageNames: Record<DynamicLanguage, string> = { EN: "English", FR: "French", SW: "Swahili" };

function key(language: DynamicLanguage, units: TranslationUnit[]) {
  return createHash("sha256").update(`${language}:${JSON.stringify(units)}`).digest("hex");
}

function fallback(units: TranslationUnit[]) {
  return units.map(({ id, title, summary, metadata }) => ({ id, title, summary, metadata }));
}

export async function translateDynamic(units: TranslationUnit[], language: DynamicLanguage): Promise<TranslationResult[]> {
  if (language === "EN" || units.length === 0) return fallback(units);
  const cacheKey = key(language, units);
  const hit = cache.get(cacheKey);
  if (hit && hit.expiresAt > Date.now()) return hit.items;
  try {
    const response = await invokeLLM({
      model: "gpt-5-mini",
      maxTokens: 3000,
      messages: [
        { role: "system", content: `You are a careful institutional translator. Translate the supplied migration-news and agency metadata into ${languageNames[language]}. Preserve proper names, registration IDs, country names when they are official names, route abbreviations, numbers, dates, and risk meaning. Do not add facts, soften allegations, or translate URLs. Return JSON only.` },
        { role: "user", content: JSON.stringify(units) },
      ],
      responseFormat: {
        type: "json_schema",
        json_schema: {
          name: "dynamic_translations",
          strict: true,
          schema: {
            type: "object",
            properties: { items: { type: "array", items: { type: "object", properties: { id: { type: "string" }, title: { type: "string" }, summary: { type: "string" }, metadata: { type: "string" } }, required: ["id", "title", "summary", "metadata"], additionalProperties: false } } },
            required: ["items"],
            additionalProperties: false,
          },
        },
      },
    });
    const content = response.choices[0]?.message.content;
    const parsed = typeof content === "string" ? JSON.parse(content) as { items?: TranslationResult[] } : null;
    const byId = new Map((parsed?.items ?? []).map(item => [item.id, item]));
    const items = units.map(unit => ({ ...unit, ...(byId.get(unit.id) ?? {}) }));
    cache.set(cacheKey, { expiresAt: Date.now() + 15 * 60 * 1000, items });
    return items;
  } catch (error) {
    console.warn(`[Translation] ${language} dynamic translation unavailable; serving source text`, error);
    return fallback(units);
  }
}
