import { describe, expect, it } from "vitest";
import { copy } from "./i18n";

describe("PSP page translations", () => {
  it("provides complete content sections in English, French, and Swahili", () => {
    for (const locale of ["EN", "FR", "SW"] as const) {
      const content = copy[locale];
      expect(content.nav.verification).not.toHaveLength(0);
      expect(content.home.title1).not.toHaveLength(0);
      expect(content.verification.audit).not.toHaveLength(0);
      expect(content.protection.rightsItems).toHaveLength(5);
      expect(content.survivor.incidentTypes).toHaveLength(5);
      expect(content.news.categories).toHaveLength(3);
      expect(content.about.partners).toHaveLength(6);
    }
  });
});
