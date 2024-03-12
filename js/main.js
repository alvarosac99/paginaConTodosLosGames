document.getElementById('selector_idioma').addEventListener('change', function () {
    var idiomaSeleccionado = this.value;
    fetch('../js/main.json')
        .then(response => response.json())
        .then(traducciones => {
            document.getElementById('titulo').innerHTML = traducciones[idiomaSeleccionado].titulo;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});