import { client } from './trpc/client.ts'

const planets = await client.planets.listPlanets.query();

console.log({ client, planets });

if (planets) {
  const planetsList = document.getElementById(
    "planets-list",
  ) as HTMLOListElement;

  planets.forEach((planet) => {
    const item = document.createElement("li") as HTMLLIElement;

    item.textContent = planet.name;
    item.addEventListener('click', async () => {
      const p = await client.planets.getPlanetById.query(planet.id);

      console.log('You clicked planet => ', { p });
    })

    planetsList.appendChild(item);
  });
}