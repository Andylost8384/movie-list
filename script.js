document.addEventListener('DOMContentLoaded', function () {
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

  function createMovieCard(movie, index) {
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

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      movies.splice(index, 1);  // Remove movie from array
      movieGrid.removeChild(card);  // Remove card from grid
      updateURLWithMovies(movies);  // Update URL after removing movie
    });

    details.appendChild(title);
    details.appendChild(select);
    card.appendChild(img);
    card.appendChild(details);
    card.appendChild(removeBtn);  // Add remove button to card
    return card;
  }

  const movies = getMoviesFromURL();
  const movieGrid = document.getElementById('movieGrid');
  
  // Create sections for categories
  const bollywoodSection = document.createElement('div');
  bollywoodSection.id = 'bollywood';
  bollywoodSection.innerHTML = '<h2>Bollywood Movies</h2>';
  
  const hollywoodSection = document.createElement('div');
  hollywoodSection.id = 'hollywood';
  hollywoodSection.innerHTML = '<h2>Hollywood Movies</h2>';
  
  const webSeriesSection = document.createElement('div');
  webSeriesSection.id = 'webSeries';
  webSeriesSection.innerHTML = '<h2>Web Series</h2>';
  
  const plus18Section = document.createElement('div');
  plus18Section.id = '18plus';
  plus18Section.innerHTML = '<h2>18+ Movies</h2>';

  // Group movies by categories
  movies.forEach((movie, index) => {
    const card = createMovieCard(movie, index);
    if (movie.category === 'Bollywood') {
      bollywoodSection.appendChild(card);
    } else if (movie.category === 'Hollywood') {
      hollywoodSection.appendChild(card);
    } else if (movie.category === 'Web Series') {
      webSeriesSection.appendChild(card);
    } else if (movie.category === '18+') {
      plus18Section.appendChild(card);
    }
  });

  // Append the movie sections to the movie grid
  movieGrid.appendChild(bollywoodSection);
  movieGrid.appendChild(hollywoodSection);
  movieGrid.appendChild(webSeriesSection);
  movieGrid.appendChild(plus18Section);

  document.getElementById('addMovie').addEventListener('click', () => {
    const name = document.getElementById('movieName').value.trim();
    const poster = document.getElementById('posterUrl').value.trim();
    const category = document.getElementById('categorySelect').value;  // Get selected category

    if (!name || !poster || !category) return;

    const movie = { name, poster, status: 'pending', category }; // Add category to movie object
    movies.push(movie);
    const card = createMovieCard(movie, movies.length - 1);

    // Append movie to the appropriate section based on the category
    if (category === 'Bollywood') {
      bollywoodSection.appendChild(card);
    } else if (category === 'Hollywood') {
      hollywoodSection.appendChild(card);
    } else if (category === 'Web Series') {
      webSeriesSection.appendChild(card);
    } else if (category === '18+') {
      plus18Section.appendChild(card);
    }

    updateURLWithMovies(movies);
    document.getElementById('movieName').value = '';
    document.getElementById('posterUrl').value = '';
    document.getElementById('categorySelect').value = '';  // Reset category selection
  });
});
