const API_KEY = "zAYxY7JxsJAE1kJFmwejcDnjRPLMpk5PZkbFIHm6";
const apodContainer = document.getElementById("apod-container");
const dateInput = document.getElementById("dateInput");
const searchBtn = document.getElementById("searchBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");
let currentAPOD = null;
async function getAPOD(date = "") {
  try {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (date) {
      url += `&date=${date}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    currentAPOD = data;
    displayAPOD(data);
  } catch (error) {
    console.error("Error al obtener la APOD:", error.message);
  }
}

function displayAPOD(data) {
  let mediaContent = "";
  if (data.media_type === "image") {
    mediaContent = `
      <img
        src="${data.url}"
        alt="${data.title}"
      >
    `;
  } else if (data.media_type === "video") {
    mediaContent = `
  <video controls width="100%">
    <source src="${data.url}" type="video/mp4">
    Tu navegador no soporta videos.
  </video>
`;
  }
  apodContainer.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.date}</p>
    ${mediaContent}
    <p>${data.explanation}</p>
   `;
}
getAPOD();

searchBtn.addEventListener("click", () => {
  const selectedDate = dateInput.value;
  if (!validateDate(selectedDate)) {
    alert("No puedes seleccionar fechas futuras");

    return;
  }
  getAPOD(selectedDate);
});

function validateDate(date) {
  const today = new Date().toISOString().split("T")[0];

  return date <= today;
}

function saveFavorite() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = favorites.some(
  favorite => favorite.date === currentAPOD.date
);

if(exists){
  alert("Este favorito ya existe");
  return;
}
  favorites.unshift(currentAPOD);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Favorito guardado correctamente");
  loadFavorites();
}
favoriteBtn.addEventListener("click", () => {
  saveFavorite();
});

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = "";

  favorites.forEach((favorite) => {
    const li = document.createElement("li");

    li.textContent = `${favorite.title} (${favorite.date})`;
    li.addEventListener("click", () => {

    displayAPOD(favorite);

  });
    favoritesList.appendChild(li);
  });
}
loadFavorites();
