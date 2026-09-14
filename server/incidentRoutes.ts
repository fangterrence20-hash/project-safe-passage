import type { Express, Request, Response } from "express";
import multer from "multer";
import { z } from "zod";
import { createIncident } from "./db";
import { storagePut } from "./storage";
import { encryptBuffer, encryptSensitive } from "./security";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
});

const incidentSchema = z.object({
  incidentType: z.enum(["travel_fraud", "extortion", "unlicensed_recruiter", "trafficking_risk", "other"]),
  agencyName: z.string().trim().max(255).optional().default(""),
  country: z.string().trim().min(2).max(120),
  narrative: z.string().trim().min(20).max(12000),
  contactMethod: z.enum(["anonymous", "email"]),
  contactEmail: z.string().trim().email().max(320).optional().or(z.literal("")),
});

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 160) || "attachment";
}

export function registerIncidentRoutes(app: Express) {
  app.post("/api/incidents/report", upload.single("attachment"), async (req: Request, res: Response) => {
    try {
      const parsed = incidentSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ ok: false, error: "Please complete the required fields and provide a meaningful narrative." });
        return;
      }
      if (parsed.data.contactMethod === "email" && !parsed.data.contactEmail) {
        res.status(400).json({ ok: false, error: "A contact email is required when contact is requested." });
        return;
      }
      const referenceId = `PSP-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      let attachmentKey: string | undefined;
      if (req.file) {
        const encrypted = encryptBuffer(req.file.buffer);
        const stored = await storagePut(`survivor-intake/${referenceId}/${safeFilename(req.file.originalname)}.enc`, encrypted, "application/octet-stream");
        attachmentKey = stored.key;
      }
      await createIncident({
        referenceId,
        incidentType: parsed.data.incidentType,
        agencyName: parsed.data.agencyName || null,
        country: parsed.data.country,
        narrativeEncrypted: encryptSensitive(parsed.data.narrative),
        contactMethod: parsed.data.contactMethod,
        contactEmailEncrypted: parsed.data.contactEmail ? encryptSensitive(parsed.data.contactEmail) : null,
        attachmentKey: attachmentKey ?? null,
        attachmentName: req.file?.originalname ?? null,
        attachmentType: req.file?.mimetype ?? null,
        status: "received",
      });
      res.status(201).json({ ok: true, referenceId, message: "Your protected report has been received." });
    } catch (error) {
      console.error("[Incident intake] failed", error instanceof Error ? error.message : "unknown error");
      res.status(500).json({ ok: false, error: "The protected intake service is temporarily unavailable. Please try again." });
    }
  });
}
