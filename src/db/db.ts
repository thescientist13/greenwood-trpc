import { z } from "zod";
import { DatabaseSync } from 'node:sqlite';

// fake data
const planets = (await import("./planets.json", { with: { type: "json" } })).default;
const database = new DatabaseSync(':memory:');

type Planet = {
  id: number;
  position: number;
  name: string;
  image: string;
  velocity: number;
  distance: number;
  description: string;
}

// Execute SQL statements from strings.
// TODO why does PRIMARY KEY fail here?
database.exec(`
  CREATE TABLE planets(
    id INTEGER,
    position INTEGER,
    name TEXT,
    image TEXT,
    velocity INTEGER,
    distance INTEGER,
    description TEXT
  ) STRICT
`);

// Create a prepared statement to insert data into the database.
// TODO: generate keys / placeholders dynamically
const insert = database.prepare('INSERT INTO planets (id, position, name, image, velocity, distance, description) VALUES (?, ?, ?, ?, ?, ?, ?)');

// Execute the prepared statement with bound values.
planets.forEach((planet) => {
  insert.run(...Object.values(planet));
});

const PlanetSchema = z.array(z.object({
  id: z.number().int().min(1),
  position: z.number().int().min(1),
  name: z.string(),
  description: z.string(),
  velocity: z.number().int(),
  distance: z.number().int(),
  image: z.string(),
}));

const db = {
  getPlanets: () => Object.values(database.prepare('SELECT * FROM planets ORDER BY id').all() as Planet[])
}

export { db };