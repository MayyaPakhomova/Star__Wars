const cssPromises = {};

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
     document.head.prepend(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then((res) => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const film = searchParams.get('film');


export function rendalPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map((src) => loadResource(src))).then(
    ([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    }
  );
}
if (film) {
  rendalPage(
    './film-info.js',
    `https://swapi.dev/api/films/${film}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
  );
} else {
  rendalPage(
    './general-info.js',
    `https://swapi.dev/api/films`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
  );
}

window.addEventListener('popstate', (e) => {
  const params = window.location.search
    .replace('?', '')
    .split('&')
    .reduce(function (p, e) {
      let a = e.split('=');
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});
  const film = params['film'] ?? void 0;
  if (film) {
    rendalPage(
      './film-info.js',
      `https://swapi.dev/api/films/`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    );
  } else {
    rendalPage(
      './general-info.js',
      `https://swapi.dev/api/films`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    );
  }
});

// {mode:'no-cors'}