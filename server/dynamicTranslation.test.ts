import { describe, expect, it } from "vitest";
import { translateDynamic } from "./dynamicTranslation";

describe("dynamic translation", () => {
  it("returns source text unchanged for English", async () => {
    const result = await translateDynamic([{ id: "a", title: "Agency", summary: "Verified", metadata: "Kenya / Gulf" }], "EN");
    expect(result).toEqual([{ id: "a", title: "Agency", summary: "Verified", metadata: "Kenya / Gulf" }]);
  });
});
