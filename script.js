
const form = document.getElementById('movieForm');
const list = document.getElementById('movieList');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  list.innerHTML = '';
  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.classList.add(movie.status.toLowerCase()); // Add the status as class (e.g., 'watched' or 'pending')
    li.textContent = `${movie.name} - Status: ${movie.status}`; // Display only status
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
    