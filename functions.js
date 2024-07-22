document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const content = document.getElementById('content');

    const tasks = [
        { name: 'Tarea 1: Algoritmos de Ordenamiento', url: 'https://github.com/byron23-creator/AlgoritmosDeOrdenamiento' },
        { name: 'Tarea 2: Lista de Tareas', url: 'https://github.com/byron23-creator/lista-tareas-updated.github.io/tree/main' },
        { name: 'Tarea 3: CSS Grid Layout', url: 'https://github.com/byron23-creator/cssgrid-layout.github.io/tree/main' },
    ];

    tasks.forEach(task => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = task.name;
        button.addEventListener('click', () => {
            loadContent(task.url);
        });
        li.appendChild(button);
        menu.appendChild(li);
    });

    function loadContent(url) {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then(response => response.json())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, 'text/html');
                const readme = doc.querySelector('article.markdown-body');
                content.innerHTML = '';
                if (readme) {
                    content.appendChild(readme);
                } else {
                    content.innerHTML = '<p>No se encontró el README.md en el repositorio.</p>';
                }
            })
            .catch(error => {
                content.innerHTML = `<p>Error al cargar el contenido: ${error.message}</p>`;
            });
    }
});
