// Select elements for interaction
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const comicsGrid = document.getElementById('comicsGrid');

// Add event listener to search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchComics(query);
  }
});

// Fetch comics from Comic Vine API
function fetchComics(query) {
  const apiKey = '2cf5f5624009dc81dd7d5746eac4c1c7253ad051'; // Replace with your actual API key
  const url = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&format=json&filter=name:${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.results) {
        displayComics(data.results);
      } else {
        comicsGrid.innerHTML = '<p>No results found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching comics:', error);
      comicsGrid.innerHTML = '<p>Error loading comics. Please try again later.</p>';
    });
}

// Display comics on the page
function displayComics(comics) {
  comicsGrid.innerHTML = ''; // Clear previous results

  comics.forEach(comic => {
    const comicCard = document.createElement('div');
    comicCard.className = 'comic-card';

    comicCard.innerHTML = `
      <img src="${comic.image.original_url}" alt="${comic.name}">
      <h3>${comic.name}</h3>
      <p>${comic.deck || 'No description available.'}</p>
    `;

    comicsGrid.appendChild(comicCard);
  });
}
