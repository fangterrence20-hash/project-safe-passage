import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { fetchLiveNews } from "./news";
import { translateDynamic, type DynamicLanguage } from "./dynamicTranslation";
import { getRegistry } from "./registry";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  news: router({
    latest: publicProcedure.input(z.object({ limit: z.number().int().min(1).max(20).default(12), language: z.enum(["EN", "FR", "SW"]).default("EN") }).optional()).query(async ({ input }) => {
      const items = await fetchLiveNews();
      const sourceItems = items.slice(0, input?.limit ?? 12);
      const translated = await translateDynamic(sourceItems.map(item => ({ id: item.id, title: item.title, summary: item.summary, metadata: `${item.source} · ${item.region} · ${item.category}` })), (input?.language ?? "EN") as DynamicLanguage);
      const byId = new Map(translated.map(item => [item.id, item]));
      return { items: sourceItems.map(item => ({ ...item, title: byId.get(item.id)?.title ?? item.title, summary: byId.get(item.id)?.summary ?? item.summary })), fetchedAt: new Date().toISOString(), live: true };
    }),
  }),

  registry: router({
    list: publicProcedure.input(z.object({ language: z.enum(["EN", "FR", "SW"]).default("EN") }).optional()).query(async ({ input }) => ({ items: await getRegistry((input?.language ?? "EN") as DynamicLanguage), fetchedAt: new Date().toISOString() })),
  }),

});

export type AppRouter = typeof appRouter;
