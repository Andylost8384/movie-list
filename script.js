
const form = document.getElementById('movieForm');
const list = document.getElementById('movieList');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  list.innerHTML = '';
  movies.forEach((movie, index) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (movie.status === 'Watched') card.classList.add('watched');

    const poster = document.createElement('img');
    poster.src = movie.poster;
    poster.alt = movie.name;

    const name = document.createElement('div');
    name.className = 'movie-name';
    name.textContent = movie.name;

    const statusSelect = document.createElement('select');
    statusSelect.className = 'movie-status';
    ['Pending', 'Watched'].forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.text = status;
      if (movie.status === status) option.selected = true;
      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener('change', () => {
      movies[index].status = statusSelect.value;
      localStorage.setItem('movies', JSON.stringify(movies));
      renderMovies();
    });

    card.appendChild(poster);
    card.appendChild(name);
    card.appendChild(statusSelect);
    list.appendChild(card);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('movieName').value;
  const poster = document.getElementById('moviePoster').value;
  const status = document.getElementById('movieStatus').value;
  movies.push({ name, poster, status });
  localStorage.setItem('movies', JSON.stringify(movies));
  form.reset();
  renderMovies();
});

renderMovies();
    