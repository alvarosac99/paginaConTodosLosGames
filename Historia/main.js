var posicionActual = 0;
var textos = [];

var idioma = localStorage.getItem('idioma') || 'es';
fetch('mainJugable.json')
    .then(response => response.json())
    .then(partes => {
        var traducciones = partes[idioma];
        for (var texto of Object.values(traducciones)) {
            textos.push(texto);
        }
        mostrarTexto();
    });

function mostrarTexto() {
    if (posicionActual >= 0 && posicionActual < textos.length) {
        var textoActual = textos[posicionActual];
        document.getElementById('textoPrincipal').innerHTML = textoActual;
    }
}

function avanzar() {
    if (posicionActual < textos.length - 1) {
        posicionActual++;
        mostrarTexto();
    }
}

function retroceder() {
    if (posicionActual > 0) {
        posicionActual += 2;
        mostrarTexto();
    }
}