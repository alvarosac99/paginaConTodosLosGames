var idioma = localStorage.getItem('idioma')
fetch('main.json')
    .then(response => response.json())
    .then(traducciones => {
        document.getElementById('titulo').innerHTML = traducciones[idioma].titulo;
        document.getElementById('vidas').innerHTML = traducciones[idioma].vidas;
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));