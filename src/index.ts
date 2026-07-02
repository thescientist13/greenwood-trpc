import { client } from './trpc/client.ts'

document.addEventListener('DOMContentLoaded', async () => {
  const planets = await client.planets.listPlanets.query();
  const modal: HTMLDialogElement | null = document.querySelector('dialog');
  const closeButton = modal?.querySelector('button');
  const content = modal?.querySelector('#content');
  const name = modal?.querySelector('#name') as HTMLHeadingElement;
  const image = modal?.querySelector('#image') as HTMLImageElement;
  console.table(planets);

  closeButton?.addEventListener('click', () => {
    modal?.close();
    image.src = '';
    name.textContent = '';
    content!.textContent = '';
  });

  if (planets) {
    const planetsList = document.getElementById("planets-list") as HTMLOListElement;

    planets.forEach((planet) => {
      const item = document.createElement("li") as HTMLLIElement;

      item.textContent = planet.name;
      item.addEventListener('click', async () => {
        const p = await client.planets.getPlanetById.query(planet.id);

        if (modal) {
          name.textContent = p?.name ?? '';
          content!.textContent = p?.description ?? '';
          image.src = p?.image ?? '';
          modal.showModal();
        }
      })

      planetsList.appendChild(item);
    });
  }
});