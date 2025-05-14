function getMoviesFromURL() {
  const params = new URLSearchParams(window.location.search);
  const moviesParam = params.get('movies');
  return moviesParam ? decodeURIComponent(moviesParam).split(',') : [];
}

function updateURLWithMovies(movies) {
  const params = new URLSearchParams();
  params.set('movies', encodeURIComponent(movies.join(',')));
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

function addMovieToList(movie) {
  const li = document.createElement('li');
  li.textContent = movie;
  document.getElementById('movieList').appendChild(li);
}

document.addEventListener('DOMContentLoaded', () => {
  const movies = getMoviesFromURL();
  movies.forEach(addMovieToList);

  const movieInput = document.getElementById('movieInput');
  const addBtn = document.getElementById('addMovieBtn');

  addBtn.addEventListener('click', () => {
    const movie = movieInput.value.trim();
    if (movie && !movies.includes(movie)) {
      movies.push(movie);
      addMovieToList(movie);
      updateURLWithMovies(movies);
      movieInput.value = '';
    }
  });
});
