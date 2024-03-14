var seleccionUser;
var seleccionIA;
var resultado;
var jugadasRestantes = 0, contadorIA = 0, contadorUser = 0;
var juegoIniciado = false

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        solicitarJugadasRestantes();
    }, 1);
});

var empateTexto
var perderTexto
var ganarTexto
var resultadoTexto
var piedraTexto
var papelTexto
var tijerasTexto
var lagartoTexto
var volverAJugarTexto
var preguntaTexto


function solicitarJugadasRestantes() {
    var idioma = localStorage.getItem('idioma');
    if (!idioma) {
        idioma = 'es';
        localStorage.setItem('idioma', idioma);
    }

    fetch('main.json')
        .then(response => response.json())
        .then(traducciones => {

            preguntaTexto = traducciones[idioma].pregunta;
            do {
                jugadasRestantes = prompt(preguntaTexto);
            } while (jugadasRestantes < 1 || isNaN(jugadasRestantes));

            document.getElementById('titulo').innerHTML = traducciones[idioma].titulo;
            document.getElementById('jugada').innerHTML = traducciones[idioma].jugada;
            document.getElementById('enviar').innerHTML = traducciones[idioma].enviar;
            document.getElementById('resultado').innerHTML = traducciones[idioma].resultado;
            document.getElementById('tu').innerHTML = traducciones[idioma].tu;
            empateTexto = traducciones[idioma].empate;
            perderTexto = traducciones[idioma].perder;
            ganarTexto = traducciones[idioma].ganar;
            resultadoTexto = traducciones[idioma].resultado2;
            piedraTexto = traducciones[idioma].piedra;
            papelTexto = traducciones[idioma].papel;
            tijerasTexto = traducciones[idioma].tijeras;
            lagartoTexto = traducciones[idioma].lagarto;
            volverAJugarTexto = traducciones[idioma].volverAJugar;

        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

}


/*  ANTIGUO CODIGO

function volverAJugar() {
    var seleccion = prompt("¿Volver a jugar? (s\\n)")
    if (seleccion.toLowerCase().startsWith('s')) {
        contadorIA = 0; contadorUser = 0;
        jugadasRestantes = prompt("Al mejor de cuanto?")
    } else {
        window.close();
    }

}

*/

const plantilla = [
    ["0", "-1", "1", "1", "-1"],
    ["1", "0", "-1", "-1", "1"],
    ["-1", "1", "0", "1", "-1"],
    ["1", "1", "-1", "0", "1"],
    ["1", "-1", "1", "-1", "0"]
];

function ia() {
    seleccionIA = Math.floor(Math.random() * 5);
    jugadas(seleccionIA, 'seleccionIA');
}

function ganador() {
    if (plantilla[seleccionUser][seleccionIA] == "0") {
        resultado = empateTexto;
        jugadasRestantes--
    } else if (plantilla[seleccionUser][seleccionIA] == "-1") {
        resultado = perderTexto;
        contadorIA++
        jugadasRestantes--
    } else if (plantilla[seleccionUser][seleccionIA] == "1") {
        resultado = ganarTexto;
        contadorUser++
        jugadasRestantes--
    }

    console.log(resultado);
    console.log(contadorUser);
    console.log(contadorIA);

    document.getElementById('resultado').innerHTML = resultado

    if (jugadasRestantes == 0) {
        if (contadorIA < contadorUser) {
            cambiar('resultado', ganarTexto)
        } else if (contadorIA == contadorUser) {
            cambiar('resultado', empateTexto);
        } else {
            cambiar('resultado', perderTexto);
        }
        setTimeout('volverAJugar()', 50);
    }

}

function cambiar(id, cambio) {
    document.getElementById(id).innerHTML = cambio;
}

setInterval('actualizar()', 1);

function actualizar() {
    cambiar('user', contadorUser);
    cambiar('ia', contadorIA);
}

function seleccion(boton) {

    switch (boton) {
        case 0: seleccionUser = 0; break;
        case 1: seleccionUser = 1; break;
        case 2: seleccionUser = 2; break;
        case 3: seleccionUser = 3; break;
        case 4: seleccionUser = 4; break;
        default: ia(); ganador(); break;
    }

    jugadas(seleccionUser, 'jugada')
}

function volverAJugar() {
    var seleccion = confirm(volverAJugarTexto);
    if (seleccion) {
        contadorIA = 0;
        contadorUser = 0;
        juegoIniciado = false;
        do {
            jugadasRestantes = prompt(preguntaTexto)
        } while (jugadasRestantes < 1 || isNaN(jugadasRestantes))

    } else {
        window.close();
    }
}

function jugadas(jugador, cambio) {
    switch (jugador) {
        case 0: cambiar(cambio, resultadoTexto + piedraTexto); break;
        case 1: cambiar(cambio, resultadoTexto + papelTexto); break;
        case 2: cambiar(cambio, resultadoTexto + tijerasTexto); break;
        case 3: cambiar(cambio, resultadoTexto + lagartoTexto); break;
        case 4: cambiar(cambio, resultadoTexto + "spock"); break;
    }
}

function resetear() {

}
reproduciendo = true
function iniciarCancion() {
    var audio = new Audio('MusicaRara.mp3');
    audio.loop = true;
    if (!reproduciendo) {
        audio.play();
        reproduciendo = true;
    }
}