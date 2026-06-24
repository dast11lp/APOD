

//INICIO 1. Obtener y mostrar la "Foto del Día" (APOD) Daniel

const apodContenedor = document.querySelector('.apod-contenedor')

const renderLoading = () => {
    apodContenedor.innerHTML = `
        <span class="loading">Cargando...</span>
    `
}

const getAPOD = async () => {
    renderLoading()
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=MzkDqvkmLLMzqT46dmN7F1aULfaXcz2w65ZAniVS`);
    const data = await res.json();
    renderizar(data);
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

getAPOD();


//FIN 1. Obtener y mostrar la "Foto del Día" (APOD) Daniel