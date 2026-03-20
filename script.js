let games = [];
let favorites = [];

fetch('games.json')
  .then(res => res.json())
  .then(data => {
    games = data;
    displayCategories();
    displayGames(games);
    displayPopular();
  });

// Display game cards
function displayGames(list) {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';
  list.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.name}">
      <h3>${game.name}</h3>
      <button onclick="addFavorite('${game.name}')">⭐ Favorite</button>
      <a href="${game.link}" target="_blank">Play</a>
    `;
    grid.appendChild(card);
  });
}

// Display popular games
function displayPopular() {
  const popularGrid = document.getElementById('popular-games');
  popularGrid.innerHTML = '';
  const popularGames = games.sort((a,b) => b.popularity - a.popularity).slice(0, 5);
  popularGames.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.name}">
      <h3>${game.name}</h3>
      <a href="${game.link}" target="_blank">Play</a>
    `;
    popularGrid.appendChild(card);
  });
}

// Display categories
function displayCategories() {
  const categories = [...new Set(games.map(g => g.category))];
  const nav = document.getElementById('categories');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => filterCategory(cat, btn);
    nav.appendChild(btn);
  });
}

function filterCategory(category, button) {
  const buttons = document.querySelectorAll('#categories button');
  buttons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  displayGames(games.filter(g => g.category === category));
}

// Search functionality
document.getElementById('search').addEventListener('input', e => {
  const value = e.target.value.toLowerCase();
  displayGames(games.filter(g => g.name.toLowerCase().includes(value)));
});

// Favorites
function addFavorite(name) {
  if (!favorites.includes(name)) {
    favorites.push(name);
    alert(`${name} added to favorites!`);
  } else {
    alert(`${name} is already in favorites.`);
  }
}
