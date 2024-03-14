var posicionActual = 0;
var textos = []; 

var idioma = localStorage.getItem('idioma') || 'es'; 
fetch('main.json')
    .then(response => response.json())
    .then(partes => {
        var traducciones = partes[idioma];
        for (var i in traducciones) {
            if (traducciones.hasOwnProperty(i)) {
                textos.push(traducciones[i]);
            }
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
        posicionActual-- ;
        mostrarTexto();
    }
}