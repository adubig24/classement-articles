
        let displayedArticles = []; // Stocker les articles affichés
        let currentDisplayIndex = 0; // Index actuel d'affichage
        let currentYearDisplayIndex = 0; // Index actuel d'affichage des articles par année
        const articlesPerPage = 50; // Nombre d'articles à afficher par page

    function displayResults() {
        const resultsDiv = document.getElementById('filtered-results');
        resultsDiv.innerHTML = currentDisplayIndex + 1 + '-' + Math.min(currentDisplayIndex + 50, displayedArticles.length) + ' sur ' + displayedArticles.length + ' résultats';

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Titre</th>
                <th>Auteurs</th>
                <th>Année de Parution</th>
                <th>Lien</th>
            </tr>
        `;

        for (let i = currentDisplayIndex; i < currentDisplayIndex + 50 && i < displayedArticles.length; i++) {
            const article = displayedArticles[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${article.title}</td>
                <td>${article.authors.join(', ')}</td>
                <td>${article.year}</td>
                <td><a href="${article.url}">Lien</a></td>
            `;
            table.appendChild(row);
        }

        resultsDiv.appendChild(table);

        // Ajouter le bouton "Afficher Plus" si nécessaire
        if (currentDisplayIndex + 50 < displayedArticles.length) {
            const showMoreButton = document.createElement('button');
            showMoreButton.textContent = 'Afficher Plus';
            showMoreButton.addEventListener('click', showMoreAndScrollTop); // Utilise la nouvelle fonction showMoreAndScrollTop
            resultsDiv.appendChild(showMoreButton);
        }

        // Ajouter la pagination en haut
        const paginationTop = document.createElement('div');
        paginationTop.innerHTML = createPaginationButtons();
        resultsDiv.prepend(paginationTop);

        // Ajouter la pagination en bas
        const paginationBottom = document.createElement('div');
        paginationBottom.innerHTML = createPaginationButtons();
        resultsDiv.appendChild(paginationBottom);
    }
    function createPaginationButtons() {
        const totalPages = Math.ceil(displayedArticles.length / 50);
        const currentPage = Math.floor(currentDisplayIndex / 50) + 1;

        let paginationButtons = '';

        // Boutons de pagination avec de l'espace entre eux
        paginationButtons += `<div class="d-flex justify-content-center mt-4">`;

        // Ajouter le bouton de la première page
        paginationButtons += `<button onclick="goToPage(1)" class="btn btn-secondary mr-2">1</button>`;

        // Ajouter les boutons pour les pages suivantes (jusqu'à la page actuelle + 10)
        for (let i = currentPage + 1; i <= Math.min(currentPage + 10, totalPages); i++) {
            paginationButtons += `<button onclick="goToPage(${i})" class="btn btn-secondary mx-2">${i}</button>`;
        }

        // Ajouter des points de suspension si nécessaire
        if (currentPage + 10 < totalPages) {
            paginationButtons += `<span class="my-auto mx-2">...</span>`;
        }

        // Ajouter le bouton de la dernière page
        paginationButtons += `<button onclick="goToPage(${totalPages})" class="btn btn-secondary ml-2">${totalPages}</button>`;

        paginationButtons += `</div>`;

        return paginationButtons;
    }

    function goToPage(page) {
        currentDisplayIndex = (page - 1) * 50;
        displayResults();
        scrollToTop(); // Ajoutez la fonction scrollToTop pour ramener l'utilisateur en haut
    }
    function showMoreAndScrollTop() {
        currentDisplayIndex += 50;
        displayResults();
        scrollToTop(); // Ramène l'utilisateur en haut après avoir affiché plus de résultats
    }

    function scrollToTop() {
        window.scrollTo(0, 0); // Scroll jusqu'en haut de la page
    }

    function showMore() {
        currentDisplayIndex += 50; // Passer aux 50 prochains résultats
        displayResults(); // Afficher les résultats mis à jour
    }
    function displayFilteredResults(articles) {
        const resultsDiv = document.getElementById('filtered-results');
        resultsDiv.innerHTML = '';

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Titre</th>
                <th>Auteurs</th>
                <th>Année de Parution</th>
                <th>Lien</th>
            </tr>
        `;

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${article.title}</td>
                <td>${article.authors.join(', ')}</td>
                <td>${article.year}</td>
                <td><a href="${article.url}">Lien</a></td>
            `;
            table.appendChild(row);
        }

        resultsDiv.appendChild(table);
    }

    function showAll() {
        fetch('/get_all_articles')
            .then(response => response.json())
            .then(articles => {
                displayedArticles = articles; // Stocker tous les articles
                currentDisplayIndex = 0; // Réinitialiser l'index d'affichage
                displayResults(); // Afficher les résultats initiaux
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
            });
    }


function showByAuthors() {
    fetch(`/get_articles_by_authors`)
        .then(response => response.json())
        .then(articles => {
            displayedArticles = articles;  // Stocker tous les articles triés par auteur
            currentauthorDisplayIndex = 0;  // Réinitialiser l'index d'affichage
            displayResults();  // Afficher les résultats initiaux
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des articles par auteurs:', error);
        });
}


    function showByYear() {
        const year = prompt("Entrez l'année :");
        fetch(`/get_articles_by_year?year=${year}`)
            .then(response => response.json())
            .then(articles => {
                displayedArticles = articles; // Stocker les articles affichés par année
                currentYearDisplayIndex = 0; // Réinitialiser l'index d'affichage par année
                displayYearResults(); // Afficher les résultats initiaux par année
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles par année:', error);
            });
    }
function displayYearResults() {
    const resultsDiv = document.getElementById('filtered-results');
    resultsDiv.innerHTML = '';

    const totalPages = Math.ceil(displayedArticles.length / articlesPerPage);

    // Calculer la plage de pages à afficher
    const startPage = Math.max(0, Math.floor(currentYearDisplayIndex / articlesPerPage) - 5);
    const endPage = Math.min(totalPages - 1, startPage + 10);

    // Construction de la pagination
    let paginationHTML = '';
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button onclick="goToPageYear(${i * articlesPerPage})">${i + 1}</button>`;
    }

    // Ajouter des points de suspension si nécessaire
    if (endPage < totalPages - 1) {
        paginationHTML += '...';
    }

    // Bouton pour la dernière page
    paginationHTML += `<button onclick="goToPageYear(${(totalPages - 1) * articlesPerPage})">${totalPages}</button>`;

    // Ajouter les boutons de pagination au haut et au bas de la liste d'articles
    resultsDiv.innerHTML += `
        <div class="pagination-top">
            ${createYearPaginationButtons()}
        </div>
    `;

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Titre</th>
            <th>Auteurs</th>
            <th>Année de Parution</th>
            <th>Lien</th>
        </tr>
    `;

    // Afficher les articles par année à partir de l'index actuel
    for (let i = currentYearDisplayIndex; i < currentYearDisplayIndex + articlesPerPage && i < displayedArticles.length; i++) {
        const article = displayedArticles[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${article.title}</td>
            <td>${article.authors.join(', ')}</td>
            <td>${article.year}</td>
            <td><a href="${article.url}">Lien</a></td>
        `;
        table.appendChild(row);
    }

    resultsDiv.appendChild(table);

    // Ajouter les boutons de pagination en bas de la liste d'articles
    resultsDiv.innerHTML += `
        <div class="pagination-bottom">
            ${paginationHTML}
        </div>
    `;

    // Ajouter le bouton "Afficher Plus" si nécessaire
    if (currentYearDisplayIndex + articlesPerPage < displayedArticles.length) {
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Afficher Plus';
        showMoreButton.addEventListener('click', showMoreYearResults);
        resultsDiv.appendChild(showMoreButton);
    }
}
    function createYearPaginationButtons() {
        const totalPages = Math.ceil(displayedArticles.length / 50);
        const currentPage = Math.floor(currentYearDisplayIndex / 50) + 1;

        let paginationButtons = '';

        // Boutons de pagination avec de l'espace entre eux
        paginationButtons += `<div class="d-flex justify-content-center mt-4">`;

        // Ajouter le bouton de la première page
        paginationButtons += `<button onclick="goToPage(1)" class="btn btn-secondary mr-2">1</button>`;

        // Ajouter les boutons pour les pages suivantes (jusqu'à la page actuelle + 10)
        for (let i = currentPage + 1; i <= Math.min(currentPage + 10, totalPages); i++) {
            paginationButtons += `<button onclick="goToPage(${i})" class="btn btn-secondary mx-2">${i}</button>`;
        }

        // Ajouter des points de suspension si nécessaire
        if (currentPage + 10 < totalPages) {
            paginationButtons += `<span class="my-auto mx-2">...</span>`;
        }

        // Ajouter le bouton de la dernière page
        paginationButtons += `<button onclick="goToPage(${totalPages})" class="btn btn-secondary ml-2">${totalPages}</button>`;

        paginationButtons += `</div>`;

        return paginationButtons;
    }
function goToPageYear(pageIndex) {
    currentYearDisplayIndex = pageIndex;
    displayYearResults();
    scrollToTop();
}

function showMoreYearResults() {
    currentYearDisplayIndex += articlesPerPage;
    displayYearResults();
    scrollToTop();
}
