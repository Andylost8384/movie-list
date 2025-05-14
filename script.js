
const form = document.getElementById('movieForm');
const list = document.getElementById('movieList');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  list.innerHTML = '';
  movies.forEach((movie, index) => {
    const li = document.createElement('li');
    li.className = movie.status.toLowerCase();

    const poster = document.createElement('img');
    poster.src = movie.poster;
    poster.alt = `${movie.name} Poster`;

    const name = document.createElement('div');
    name.className = 'movie-name';
    name.textContent = movie.name;

    const status = document.createElement('select');
    status.className = 'status';
    const options = ['Pending', 'Watched'];
    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.text = opt;
      if (movie.status === opt) option.selected = true;
      status.appendChild(option);
    });

    status.addEventListener('change', () => {
      movie.status = status.value;
      localStorage.setItem('movies', JSON.stringify(movies));
      renderMovies();
    });

    li.appendChild(poster);
    li.appendChild(name);
    li.appendChild(status);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('movieName').value;
  const status = document.getElementById('movieStatus').value;
  const poster = document.getElementById('moviePoster').value;
  movies.push({ name, status, poster });
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovies();
  form.reset();
});

renderMovies();
    