function getMoviesFromURL() {
  const params = new URLSearchParams(window.location.search);
  const data = params.get('movies');
  return data ? JSON.parse(decodeURIComponent(data)) : [];
}

function updateURLWithMovies(movies) {
  const params = new URLSearchParams();
  params.set('movies', encodeURIComponent(JSON.stringify(movies)));
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card ' + movie.status;

  const img = document.createElement('img');
  img.src = movie.poster;

  const details = document.createElement('div');
  details.className = 'details';

  const title = document.createElement('h3');
  title.textContent = movie.name;

  const select = document.createElement('select');
  select.className = 'status-select';
  ['complete', 'pending'].forEach(status => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    if (movie.status === status) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    movie.status = select.value;
    card.className = 'movie-card ' + movie.status;
    updateURLWithMovies(movies);
  });

  details.appendChild(title);
  details.appendChild(select);
  card.appendChild(img);
  card.appendChild(details);
  return card;
}

const movies = getMoviesFromURL();
const movieGrid = document.getElementById('movieGrid');
movies.forEach(movie => {
  const card = createMovieCard(movie);
  movieGrid.appendChild(card);
});

document.getElementById('addMovie').addEventListener('click', () => {
  const name = document.getElementById('movieName').value.trim();
  const poster = document.getElementById('posterUrl').value.trim();
  if (!name || !poster) return;

  const movie = { name, poster, status: 'pending' };
  movies.push(movie);
  const card = createMovieCard(movie);
  movieGrid.appendChild(card);
  updateURLWithMovies(movies);
  document.getElementById('movieName').value = '';
  document.getElementById('posterUrl').value = '';
});
