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