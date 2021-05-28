import { rendalPage } from './index.js';
export function render(data) {
  const appContainer = document.getElementById('app');
  const buttonBack = document.createElement('button');
  const container = document.createElement('div');
  const header = document.createElement('h1');
  const episode = document.createElement('h5');
  const cardText = document.createElement('p');
  const wrapper = document.createElement('div');
  const wrapperPlanets = document.createElement('div');
  const planetsHeader = document.createElement('h2');
  const wrapperSpecies = document.createElement('div');
  const speciesHeader = document.createElement('h2');
  const wrapperCharacters = document.createElement('div');
  const charactersHeader = document.createElement('h2');
  let planetslist;
  let specieslist;
  let characterslist;

  container.classList.add('container', 'py-4', 'text-center', 'text-secondary');
  header.classList.add('m-3');
  cardText.classList.add('card-text', 'm-3');
  wrapper.classList.add(
    'd-flex',
    'justify-content-around',
    'flex-wrap',
    'py-4'
  );
  buttonBack.classList.add('btn', 'btn-outline-secondary', 'mt-3', 'ms-3');

  buttonBack.textContent = 'Back to episodes';
  header.textContent = data.title;
  episode.textContent = `Episode ${letter(data.episode_id)}`;
  cardText.textContent = data.opening_crawl;
  planetsHeader.textContent = 'Planets';
  speciesHeader.textContent = 'Species';
  charactersHeader.textContent = 'Characters';

  wrapperPlanets.append(planetsHeader);
  wrapperSpecies.append(speciesHeader);
  wrapperCharacters.append(charactersHeader);
  wrapper.append(wrapperCharacters, wrapperPlanets, wrapperSpecies);

  details(data.planets, planetslist, wrapperPlanets);
  details(data.species, specieslist, wrapperSpecies);
  details(data.characters, characterslist, wrapperCharacters);

  appContainer.append(buttonBack);
  container.append(header, episode, cardText, wrapper);

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
          optionslist = document.createElement('div');
          optionslist.textContent = data.name;
          wrapperoptions.append(optionslist);
        });
    });
  }
}
