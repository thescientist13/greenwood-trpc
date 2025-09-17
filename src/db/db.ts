import { z } from "zod";

// fake database
const planets = await import("./planets.json", {
  with: { type: "json" },
});

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  position: z.number().int().min(1),
  name: z.string(),
  description: z.string(),
  velocity: z.number().int(),
  distance: z.number().int(),
  image: z.string(),
});

// wire up to schema
const db = {
  getPlanets: () => planets
}

export { db };