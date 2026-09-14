import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const incidents = mysqlTable("incidents", {
  id: int("id").autoincrement().primaryKey(),
  referenceId: varchar("referenceId", { length: 48 }).notNull().unique(),
  incidentType: mysqlEnum("incidentType", ["travel_fraud", "extortion", "unlicensed_recruiter", "trafficking_risk", "other"]).notNull(),
  agencyName: varchar("agencyName", { length: 255 }),
  country: varchar("country", { length: 120 }).notNull(),
  narrativeEncrypted: text("narrativeEncrypted").notNull(),
  contactMethod: mysqlEnum("contactMethod", ["anonymous", "email"]).notNull(),
  contactEmailEncrypted: text("contactEmailEncrypted"),
  attachmentKey: varchar("attachmentKey", { length: 512 }),
  attachmentName: varchar("attachmentName", { length: 255 }),
  attachmentType: varchar("attachmentType", { length: 120 }),
  status: mysqlEnum("status", ["received", "triage", "referred", "closed"]).default("received").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Incident = typeof incidents.$inferSelect;
export type InsertIncident = typeof incidents.$inferInsert;
