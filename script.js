
const form = document.getElementById('movieForm');
const list = document.getElementById('movieList');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  list.innerHTML = '';
  movies.forEach((movie, index) => {
    const li = document.createElement('li');
    li.classList.add(movie.status.toLowerCase()); // Add the status as class (e.g., 'watched' or 'pending')
    li.textContent = `${movie.name} - ${movie.status}`;
    
    // Create a button to toggle status
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Status';
    toggleButton.addEventListener('click', () => toggleStatus(index));

    li.appendChild(toggleButton);
    list.appendChild(li);
  });
}

function toggleStatus(index) {
  // Toggle the status between 'Pending' and 'Watched'
  const movie = movies[index];
  if (movie.status === 'Pending') {
    movie.status = 'Watched';
  } else {
    movie.status = 'Pending';
  }
  
  // Save the updated movie list to localStorage
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovies();
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
    