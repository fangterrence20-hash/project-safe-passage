import { translateDynamic, type DynamicLanguage } from "./dynamicTranslation";

export type AgencyRecord = { id: string; name: string; country: string; route: string; status: "VERIFIED" | "UNDER AUDIT" | "HIGH RISK"; score: number };
const agencies: AgencyRecord[] = [
  { id: "CM-PEA-00020", name: "CivicBridge Mobility", country: "Cameroon", route: "Central / Gulf", status: "VERIFIED", score: 94 },
  { id: "TZ-PEA-00041", name: "EastBridge Labour Mobility", country: "Tanzania", route: "East / Gulf", status: "VERIFIED", score: 94 },
  { id: "TZ-EDU-00018", name: "Kilimanjaro Study Pathways", country: "Tanzania", route: "East / Europe", status: "VERIFIED", score: 91 },
  { id: "KE-PEA-00107", name: "Horizon Talent Connect", country: "Kenya", route: "East / Gulf", status: "UNDER AUDIT", score: 68 },
  { id: "TZ-EDU-00063", name: "Mwanza Global Scholars", country: "Tanzania", route: "East / Europe", status: "VERIFIED", score: 88 },
  { id: "NG-PEA-00092", name: "Nexus Online Careers", country: "Nigeria", route: "West / Southeast Asia", status: "HIGH RISK", score: 24 },
];

export async function getRegistry(language: DynamicLanguage) {
  const translated = await translateDynamic(agencies.map(a => ({ id: a.id, title: a.name, summary: a.country, metadata: a.route })), language);
  const byId = new Map(translated.map(item => [item.id, item]));
  return agencies.map(a => ({ ...a, name: byId.get(a.id)?.title ?? a.name, country: byId.get(a.id)?.summary ?? a.country, route: byId.get(a.id)?.metadata ?? a.route }));
}
