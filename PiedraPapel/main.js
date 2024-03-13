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

function solicitarJugadasRestantes() {
    do {
        jugadasRestantes = prompt("Al mejor de cuanto?");
    } while (jugadasRestantes < 1 || isNaN(jugadasRestantes));
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
        resultado = "EMPATE";
        jugadasRestantes--
    } else if (plantilla[seleccionUser][seleccionIA] == "-1") {
        resultado = "IA GANA";
        contadorIA++
        jugadasRestantes--
    } else if (plantilla[seleccionUser][seleccionIA] == "1") {
        resultado = "USUARIO GANA";
        contadorUser++
        jugadasRestantes--
    }

    console.log(resultado);
    console.log(contadorUser);
    console.log(contadorIA);

    document.getElementById('resultado').innerHTML = resultado

    if (jugadasRestantes == 0) {
        if (contadorIA < contadorUser) {
            cambiar('resultado', "GANASTE LA PARTIDA!!")
        } else if (contadorIA == contadorUser) {
            cambiar('resultado', "EMPATE");
        } else {
            cambiar('resultado', "PERDISTE LA PARTIDA :C");
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
    var seleccion = confirm("¿Volver a jugar?");
    if (seleccion) {
        contadorIA = 0;
        contadorUser = 0;
        juegoIniciado = false;
        do {
            jugadasRestantes = prompt("Al mejor de cuanto?")
        } while (jugadasRestantes < 1 || isNaN(jugadasRestantes))

    } else {
        window.close();
    }
}

function jugadas(jugador, cambio) {
    switch (jugador) {
        case 0: cambiar(cambio, "Selección: piedra"); break;
        case 1: cambiar(cambio, "Selección: papel"); break;
        case 2: cambiar(cambio, "Selección: tijera"); break;
        case 3: cambiar(cambio, "Selección: lagarto"); break;
        case 4: cambiar(cambio, "Selección: spock"); break;
    }
}

function resetear() {

}
reproduciendo = false
function iniciarCancion() {
    var audio = new Audio('MusicaRara.mp3');
    audio.loop = true;
    if (!reproduciendo) {
        audio.play();
        reproduciendo = true;
    }
}