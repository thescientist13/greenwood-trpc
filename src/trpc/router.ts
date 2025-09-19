import { initTRPC } from '@trpc/server';
import { db } from "../db/db.ts";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const planetsRouter = router({
  listPlanets: publicProcedure.query(() => db.getPlanets()),
});

export const appRouter = router({
  planets: planetsRouter,
});

export type AppRouter = typeof appRouter;