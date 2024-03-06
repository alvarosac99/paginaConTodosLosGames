function quitarPuntuacion(caso) {
    var puntuacion = document.getElementsByClassName('puntuacion');
    for (var i = 0; i < puntuacion.length; i++) {
        puntuacion[i].display = caso;
    }
}

function desactivarBotones(caso) {
    var botones = document.getElementsByClassName('boton');
    for (var i = 0; i < botones.length; i++) {
        botones[i].disabled = caso;
    }
}

