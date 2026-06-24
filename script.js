////////////////// Inicio Alejandro ///////////////////

const btnsFavoritos = document.querySelector('.btns-favoritos')

btnsFavoritos.addEventListener('click', (event) => {
    const card = event.target.closest('.card');

    const cardApod = {
        titulo:
        fecha:
        imagen:
        explicacion:
    };

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const existe = favoritos.some(fav = fav.id === cardApod.titulo);

    if (!existe) {
        favoritos.push(cardApod);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert('APOD agregado a favoritos');
    } else {
        alert('APOD ya está agregado en favoritos');
    }
})
//////////////////// Fin Alejandro ////////////////////


//INICIO 1. Obtener y mostrar la "Foto del Día" (APOD) Daniel

const apodContenedor = document.querySelector('.apod-contenedor')
const inputFecha = document.querySelector('#fecha');


const renderLoading = () => {
    apodContenedor.innerHTML = `
        <span class="loading">Cargando...</span>
    `
}

const getAPOD = async (fecha = '') => {
    renderLoading()
    try {
        const url = fecha
            ? `https://api.nasa.gov/planetary/apod?api_key=MzkDqvkmLLMzqT46dmN7F1aULfaXcz2w65ZAniVS&date=${fecha}`
            : `https://api.nasa.gov/planetary/apod?api_key=MzkDqvkmLLMzqT46dmN7F1aULfaXcz2w65ZAniVS`
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data) 
    } catch (error) {
        apodContenedor.innerHTML = `<p class="error">${"no se pudo cargar la información"}</p>`
    }
}

const renderizar = (data) => {
    const media = data.media_type === 'video'
        ? `<video width="640" height="360" controls autoplay muted>
               <source src="${data.url}" type="video/mp4" />
               Tu navegador no soporta la etiqueta de video.
           </video>`
        : `<div class="contenedor-imagen">
               <img src="${data.url}" alt="${data.title}" />
           </div>`;
    apodContenedor.innerHTML = `
        <div class="apod-contenedor">
            <h2 class="titulo">${data.title}</h2>
            ${media}
            <div class="explanation">
                <p>${data.explanation}</p>
            </div>
        </div>
    `;

}

inputFecha.addEventListener('change', (e) => {
    getAPOD(e.target.value)
})

getAPOD()

//FIN 1. Obtener y mostrar la "Foto del Día" (APOD) Daniel
