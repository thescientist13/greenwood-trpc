import { z } from "zod";
import { DatabaseSync } from 'node:sqlite';

type Planet = {
  id: number;
  position: number;
  name: string;
  image: string;
  velocity: number;
  distance: number;
  description: string;
}

// const PlanetSchema = z.array(z.object({
//   id: z.number().int().min(1),
//   position: z.number().int().min(1),
//   name: z.string(),
//   description: z.string(),
//   velocity: z.number().int(),
//   distance: z.number().int(),
//   image: z.string(),
// }));

// fake data
const planets = (await import("./planets.json", { with: { type: "json" } })).default;
// start an in memory DB
const database = new DatabaseSync(':memory:');

// create the planets table
database.exec(`
  CREATE TABLE planets(
    id INTEGER PRIMARY KEY,
    position INTEGER,
    name TEXT,
    image TEXT,
    velocity INTEGER,
    distance INTEGER,
    description TEXT
  ) STRICT
`);

// Create a prepared statement to insert data into the database
const columns = Object.keys(planets[0]);
const insert = database.prepare(`INSERT INTO planets (${columns.join(', ')}) VALUES (${columns.map(c => '?').join(', ')})`);

// loop over all planets and execute the prepared statement with bound values for each entry
planets.forEach((planet) => {
  insert.run(...Object.values(planet));
});

const db = {
  getPlanets: () => Object.values(database.prepare('SELECT * FROM planets ORDER BY id').all() as Planet[])
}

export { db };