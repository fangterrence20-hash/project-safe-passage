import { beforeEach, describe, expect, it, vi } from "vitest";
import { decryptSensitive, encryptSensitive } from "./security";
import { fetchLiveNews } from "./news";

describe("PSP sensitive intake security", () => {
  it("encrypts and decrypts narrative data without storing plaintext", () => {
    const plaintext = "A recruiter requested a large payment before showing a contract.";
    const encrypted = encryptSensitive(plaintext);
    expect(encrypted).not.toContain(plaintext);
    expect(decryptSensitive(encrypted)).toBe(plaintext);
  });

  it("produces different ciphertext for repeated submissions", () => {
    const plaintext = "same survivor narrative";
    expect(encryptSensitive(plaintext)).not.toBe(encryptSensitive(plaintext));
  });
});

describe("PSP official news monitor", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("parses only migration-relevant items from the official UN RSS response", async () => {
    const xml = `<?xml version="1.0"?><rss><channel><item><title>New protection response for refugees and migrants</title><description>Officials announced a new support pathway.</description><link>https://news.un.org/story/1</link><pubDate>Mon, 01 Sep 2026 00:00:00 GMT</pubDate></item><item><title>General climate update</title><description>Weather information.</description><link>https://news.un.org/story/2</link><pubDate>Mon, 01 Sep 2026 00:00:00 GMT</pubDate></item></channel></rss>`;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(xml, { status: 200, headers: { "content-type": "application/rss+xml" } })));
    const result = await fetchLiveNews();
    expect(result.some((item) => item.title.includes("refugees and migrants"))).toBe(true);
    expect(result.some((item) => item.title.includes("General climate"))).toBe(false);
    expect(result.some((item) => item.source === "INTERPOL")).toBe(true);
  });
});
