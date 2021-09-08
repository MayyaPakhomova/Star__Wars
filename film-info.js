import { rendalPage } from './index.js';
export function render(data) {
  const appContainer = document.getElementById('app');
  const buttonBack = document.createElement('button');
  const container = document.createElement('div');
  const header = document.createElement('h1');
  const episode = document.createElement('h3');
  const director = document.createElement('h5');
  const producer = document.createElement('h5');
  const cardText = document.createElement('p');
  const wrapper = document.createElement('div');
  const wrapperPlanets = document.createElement('div');
  const planetsHeader = document.createElement('h3');
  const wrapperSpecies = document.createElement('div');
  const speciesHeader = document.createElement('h3');
  const wrapperStarships = document.createElement('div');
  const starshipsHeader = document.createElement('h3');
  const wrappercharacters = document.createElement('div');
  const wrappercharactersHeader = document.createElement('h3');

  let planetslist;
  let specieslist;
  let starshipslist;
  let characterslist;

  container.classList.add('container', 'text-center', 'text-white');
  header.classList.add('m-3');
  cardText.classList.add('card-text', 'm-3');
  wrapper.classList.add(
    'd-flex',
    'justify-content-around',
    'flex-wrap',
    'py-2'
  );
  wrappercharacters.append(wrappercharactersHeader);
  buttonBack.classList.add('btn', 'mt-3', 'ms-3', 'btn-outline-light');

  buttonBack.textContent = 'Back to episodes';
  header.textContent = data.title;
  episode.textContent = `Episode ${letter(data.episode_id)}`;
  director.textContent = `Director ${data.director} `;
  producer.textContent = `Producer ${data.producer}`;
  cardText.textContent = data.opening_crawl;
  planetsHeader.textContent = 'Planets';
  speciesHeader.textContent = 'Species';
  starshipsHeader.textContent = 'Starships';
  wrappercharactersHeader.textContent = 'Characters';

  document.body.style.transition = '2s';
  if (data.episode_id === 4) {
    appContainer.style.backgroundImage = 'url(img/1977.jpg)';
  }
  if (data.episode_id === 5) {
    appContainer.style.backgroundImage = 'url(img/1980.jpg)';
  }
  if (data.episode_id === 6) {
    appContainer.style.backgroundImage = 'url(img/1983.jpg)';
  }
  if (data.episode_id === 1) {
    appContainer.style.backgroundImage = 'url(img/1999.jpg)';
  }
  if (data.episode_id === 2) {
    appContainer.style.backgroundImage = 'url(img/2002.jpg)';
  }
  if (data.episode_id === 3) {
    appContainer.style.backgroundImage = 'url(img/2005.jpg)';
  }

  wrapperPlanets.append(planetsHeader);
  wrapperSpecies.append(speciesHeader);
  wrapperStarships.append(starshipsHeader);
  wrapper.append(wrapperStarships, wrapperPlanets, wrapperSpecies);

  details(data.planets, planetslist, wrapperPlanets);
  details(data.species, specieslist, wrapperSpecies);
  details(data.starships, starshipslist, wrapperStarships);
  details(data.characters, starshipslist, wrappercharacters);

  appContainer.append(buttonBack);
  container.append(
    header,
    episode,
    director,
    producer,
    cardText,
    wrapper,
    wrappercharacters
  );

  buttonBack.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
    rendalPage(
      './general-info.js',
      'https://swapi.dev/api/films',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    );
  });
  return container;
}

function letter(x) {
  if (x == 1) x = 'I';
  if (x == 2) x = 'II';
  if (x == 3) x = 'III';
  if (x == 4) x = 'IV';
  if (x == 5) x = 'V';
  if (x == 2) x = 'VI';
  return x;
}
function details(options, optionslist, wrapperoptions) {
  if (options) {
    options.forEach((option) => {
      fetch(option)
        .then((res) => res.json())
        .then((data) => {
          optionslist = document.createElement('span');
          optionslist.classList.add('p-2');
          optionslist.textContent = `  ${data.name} `;
          wrapperoptions.classList.add('m-2');
          wrapperoptions.append(optionslist);
        });
    });
  }
}
