let searchBoxInput = document.getElementById("search-box");
let button = document.getElementById("submit");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".searchListItem");
const viewDetails = document.getElementById("view-details");
let favorites = [];
const privateKey = '6a48c9b99b4c0b8ac879d0a89d3c8b2d18c885cc';
const publicKey = '83709e7bad3abf2302009bddcc9be527';
const ts = Date.now().toString();
const calcHashValue = ts + privateKey + publicKey;
const hashValue = CryptoJS.MD5(calcHashValue).toString();

const [timestamp, apiKey, hash_Value] = [ts, publicKey, hashValue];

function displayWords(value) {
  searchBoxInput.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

searchBoxInput.addEventListener("keyup", async () => {
  removeElements();
  if (searchBoxInput.value.length < 1) {
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashValue}&nameStartsWith=${searchBoxInput.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, searchBoxInput.value.length) + "</b>";
    word += name.substr(searchBoxInput.value.length);
    div.innerHTML = `<p class= "item">${word}</p>`;
    listContainer.appendChild(div);
  })
});

const getResult = async () => {
  if (searchBoxInput.value.trim().length < 1) {
    alert("Input cannot be empty");
    return;
  }
  showContainer.innerHTML = ""; // Clear previous results
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashValue}&name=${searchBoxInput.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();
  const superheroDetails = jsonData.data.results[0];

  jsonData.data["results"].forEach(element => {
    showContainer.innerHTML += `
      <div class="card-container" data-id="${element.id}">
        <div class="container-char-img">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}"/>
        </div>
        <div class="container-char-text">
          <div class="char-name">${element.name}</div><br>
          <div class="char-description">${element.description}</div><br>
          <button class="addToFavorites">
            <h3>Add to favorites &nbsp</h3>
            <i class="fa-regular fa-heart fa-2xl"></i>
          </button>
          <button class="ViewMore">
            <h3>View More &nbsp</h3>
            <i class="fa fa-arrow-right fa-2xl"></i>
          </button>
        </div>
      </div>`;
  });

  // Attach event listeners to favorite buttons
  const favoriteButtons = document.getElementsByClassName("addToFavorites");
  for (let i = 0; i < favoriteButtons.length; i++) {
    favoriteButtons[i].addEventListener("click", handleFavorite);
  }

  // Attach event listeners to view more buttons
  const viewMoreButtons = document.getElementsByClassName("ViewMore");
  for (let i = 0; i < viewMoreButtons.length; i++) {
    viewMoreButtons[i].addEventListener("click", async (event) => {
      showContainer.style.display = "none";
      listContainer.style.display = "none";
      favoritesList.style.display = "none";
      viewDetails.style.display = "block";
      const characterCard = event.target.closest(".card-container");
      const characterId = characterCard.getAttribute("data-id");

      const characterDetails = await fetchCharacterDetails(characterId);
      displayCharacterDetails(characterDetails);
    });
  }
};

// Function to fetch character details by ID
const fetchCharacterDetails = async (characterId) => {
  const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  const characterDetails = jsonData.data.results[0];
  return characterDetails;
};

// Function to display character details in the viewDetails container
const displayCharacterDetails = (characterDetails) => {
  const viewDetailsContainer = document.getElementById("view-details");

  let comicsList = "";
  if (characterDetails.comics) {
    comicsList = characterDetails.comics.items
      .map((comic) => `<li>${comic.name}</li>`)
      .join("");
  }

  let eventsList = "";
  if (characterDetails.events) {
    eventsList = characterDetails.events.items
      .map((event) => `<li>${event.name}</li>`)
      .join("");
  }

  let seriesList = "";
  if (characterDetails.series) {
    seriesList = characterDetails.series.items
      .map((series) => `<li>${series.name}</li>`)
      .join("");
  }

  let storiesList = "";
  if (characterDetails.stories) {
    storiesList = characterDetails.stories.items
      .map((story) => `<li>${story.name}</li>`)
      .join("");
  }

  viewDetailsContainer.innerHTML = `
    <div class="main-details">
      <h2>${characterDetails.name}</h2><br>
      <div class="char-description">${characterDetails.description}</div>
      <img src="${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}" />
    </div>
    <div class="other-details">
      <div class="detail">
        <h3>Comics:</h3>
        <ul>${comicsList}</ul>
      </div>
      <div class="detail">
        <h3>Events:</h3>
        <ul>${eventsList}</ul>
      </div>
      <div class="detail">
        <h3>Series:</h3>
        <ul>${seriesList}</ul>
      </div>
      <div class="detail">
        <h3>Stories:</h3>
        <ul>${storiesList}</ul>
      </div>
      <div class="search-more">
        <a href="superhero.html">Search More Superhero</a>
      </div>
    </div>
  `;
};

const handleFavorite = (event) => {
  const characterCard = event.target.closest(".card-container");
  const characterName = characterCard.querySelector(".char-name").textContent;
  const characterId = characterCard.getAttribute("data-id");
  const characterDes = characterCard.querySelector(".char-description").textContent;

  // Check if the character is already in favorites
  const isFavorite = favorites.find((character) => character.id === characterId);
  if (isFavorite) {
    alert(`${characterName} is already in favorites!`);
    return;
  }

  // Add the character to favorites
  favorites.push({ id: characterId, name: characterName, description: characterDes });
  alert(`Added ${characterName} to favorites!`);
};

let favoritesList = document.querySelector(".falist");
const displayFavorites = () => {
  favoritesList.innerHTML = "";

  favorites.forEach((character) => {
    const listItem = document.createElement("li");
    listItem.classList.add("fa-list-item");

    // Create name element
    const name = document.createElement("h4");
    name.textContent = character.name;
    listItem.appendChild(name);

    // Create description element
    const description = document.createElement("p");
    description.textContent = character.description;
    listItem.appendChild(description);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteFavorite(character.id));

    listItem.appendChild(deleteButton);
    favoritesList.appendChild(listItem);
  });
};

const deleteFavorite = (characterId) => {
  favorites = favorites.filter((character) => character.id !== characterId);
  displayFavorites();
};

const viewFavoritesButton = document.getElementById("view-favorites");
viewFavoritesButton.addEventListener("click", () => {
  showContainer.style.display = "none";
  favoritesList.style.display = "block";
  viewDetails.style.display = "none";
  displayFavorites();
});

button.addEventListener("click", async => {
  showContainer.style.display = "block";
});
button.addEventListener("click", getResult);