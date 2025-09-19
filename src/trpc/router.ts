import { initTRPC } from '@trpc/server';
import { db } from "../db/db.ts";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;
const router = t.router;

const planetsRouter = router({
  listPlanets: publicProcedure.query(() => db.getPlanets()),
  getPlanetById: publicProcedure
    .input(z.number())
    .query((opts) => db.getPlanetById(opts.input))
});

export const appRouter = router({
  planets: planetsRouter,
});

export type AppRouter = typeof appRouter;