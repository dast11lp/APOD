let guardar = document.getElementById('btn-favorito');
let apodActual = null;

function guardarFavorito() {

    if (apodActual == null) {
        alert("No hay nada que guardar");
        return;
    }

    let favoritos = localStorage.getItem("favoritos");

    if (favoritos == null) {
        favoritos = [];
    } else {
        favoritos = JSON.parse(favoritos);
    }

    let repetido = false;

    favoritos.forEach(function(apod) {
        if (apod.date == apodActual.date) {
            repetido = true;
        }
    });

    if (repetido) {
        alert("Esta imagen ya está guardada");
        return;
    }

    favoritos.push(apodActual);

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    alert("Guardado en favoritos");
}

guardar.addEventListener("click", guardarFavorito);