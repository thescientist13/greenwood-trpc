import { client } from './trpc/client.ts'

document.addEventListener('DOMContentLoaded', async () => {
  const planets = await client.planets.listPlanets.query();
  const modal: HTMLDialogElement | null = document.querySelector('dialog');
  const closeButton = modal?.querySelector('button');
  console.log({ client, planets });

  closeButton?.addEventListener('click', () => {
    modal?.close();
  });

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

        if (modal) {
          modal.querySelector('#content')!.textContent = p?.description ?? '';
          modal.showModal();
        }
      })

      planetsList.appendChild(item);
    });
  }
});