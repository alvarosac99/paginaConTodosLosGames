var idioma = localStorage.getItem('idioma');
if (!idioma) {
    idioma = 'es';
    localStorage.setItem('idioma', idioma);
}

var perderTexto;
var vidasTexto;
var reinicio2Texto;

fetch('main.json')
    .then(response => response.json())
    .then(traducciones => {
        vidasTexto = traducciones[idioma].vidas;
        perderTexto = traducciones[idioma].perder;
        reinicio2Texto = traducciones[idioma].reinicio2;
        document.getElementById('titulo').innerHTML = traducciones[idioma].titulo;
        document.getElementById('vidas').innerHTML = traducciones[idioma].vidas;
        document.getElementById('reinicio').innerHTML = traducciones[idioma].reinicio;
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

var terreno = [];
var vidas = 3;
var tamanio = 10;

document.getElementById("vidas").innerHTML = vidasTexto + vidas;

function mostrarJuego() {
    vidas = 3;
    document.getElementById("vidas").innerHTML = vidasTexto + vidas;
    document.getElementById("reinicio").innerHTML = reinicio2Texto;
    var resultado = document.getElementById("juego");
    resultado.innerHTML = "";
    rellenar();

    for (var i = 0; i < terreno.length; i++) {
        for (var j = 0; j < terreno[i].length; j++) {
            resultado.innerHTML += '<button class="boton" onclick="jugar(event, ' + i + ',' + j + ')">' + /*terreno[i][j]+*/  "" + '</button>';
        }
        resultado.innerHTML += "<br>";
    }

}

function rellenar() {
    for (var i = 0; i < tamanio; i++) {
        terreno[i] = [];
        for (var j = 0; j < tamanio; j++) {
            var num = Math.floor(Math.random() * 10);
            if (num == 1) {
                terreno[i][j] = "BUM";
            } else {
                terreno[i][j] = "N";
            }
        }
    }

    for (var i = 0; i < terreno.length; i++) {
        for (var j = 0; j < terreno[i].length; j++) {
            if (terreno[i][j] == "N") {
                var contador = 0;

                for (var x = -1; x <= 1; x++) {
                    for (var y = -1; y <= 1; y++) {
                        var x1 = i + x;
                        var y1 = j + y;

                        if (x1 >= 0 && x1 < terreno.length && y1 >= 0 && y1 < terreno[i].length) {
                            if (terreno[x1][y1] == "BUM") {
                                contador++;
                            }
                        }
                    }
                }
                if (contador > 0) {
                    terreno[i][j] = "!!!";
                } else {
                    terreno[i][j] = "???";
                }
            }
        }
    }
}

var idioma = localStorage.getItem('idioma')

function jugar(event, i, j) {
    var clic = event.target;
    switch (terreno[i][j]) {
        case "!!!":
            clic.style.backgroundColor = "yellow";
            break;
        case "???":
            clic.style.backgroundColor = "white";
            for (var x = -1; x <= 1; x++) {
                for (var y = -1; y <= 1; y++) {
                    var x1 = i + x;
                    var y1 = j + y;

                    if (x1 >= 0 && x1 < terreno.length && y1 >= 0 && y1 < terreno[i].length) {
                        if (terreno[x1][y1] == "???") {
                            var adyacente = document.querySelector('[onclick="jugar(event, ' + x1 + ',' + y1 + ')"]');
                            adyacente.style.backgroundColor = "white";
                        }
                    }
                }
            }
            break;
        case "BUM":
            vidas -= 1
            document.getElementById("vidas").innerHTML = vidasTexto + vidas;
            clic.style.backgroundColor = "red";
            if (vidas <= -1) {
                alert(perderTexto);
                mostrarJuego();
            }

    }



}