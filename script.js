
const form = document.getElementById('movieForm');
const list = document.getElementById('movieList');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  list.innerHTML = '';
  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.classList.add(movie.status.toLowerCase());

    const nameStatus = document.createElement('div');
    nameStatus.textContent = `${movie.name} - Status: ${movie.status}`;
    
    const poster = document.createElement('img');
    poster.src = movie.poster;
    poster.alt = `${movie.name} Poster`;
    poster.style.width = '100px';

    li.appendChild(poster);
    li.appendChild(nameStatus);
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
    