var idiomaAlmacenado = localStorage.getItem('idioma');
if (idiomaAlmacenado) {
    aplicarTraducciones(idiomaAlmacenado);
    document.getElementById('selector_idioma').value = idiomaAlmacenado;
}

document.getElementById('selector_idioma').addEventListener('change', function () {
    var idiomaSeleccionado = this.value;
    localStorage.setItem('idioma', idiomaSeleccionado);
    aplicarTraducciones(idiomaSeleccionado);
});

idioma = localStorage.getItem('idioma')
fetch('main.json')
    .then(response => response.json())
    .then(traducciones => {
        document.getElementById('titulo').innerHTML = traducciones[idioma].titulo;
        document.getElementById('tituloPiedraPapel').innerHTML = traducciones[idioma].tituloPiedraPapel;
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));