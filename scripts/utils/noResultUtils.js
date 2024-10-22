export function noResultFound(isNoResultsFound) {
    const noResultsMessage = document.getElementById('no-results-message');
    if(!noResultsMessage) {
        console.error('Le conteneur no-results-message n\'existe pas');
        return;
    }

    if(isNoResultsFound) {
        noResultsMessage.innerHTML = `<p class="no-results-message">Aucun résultat ne correspond à votre recherche</p>`;
    } else {
        noResultsMessage.innerHTML = '';
    }
}