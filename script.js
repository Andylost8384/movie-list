
const form = document.getElementById('movieForm');
const list = document.getElementById('movieList');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  list.innerHTML = '';
  movies.forEach((movie, index) => {
    const li = document.createElement('li');
    li.textContent = `${movie.name} - ${movie.status}`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('movieName').value;
  const status = document.getElementById('movieStatus').value;
  movies.push({ name, status });
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovies();
  form.reset();
});

renderMovies();
    