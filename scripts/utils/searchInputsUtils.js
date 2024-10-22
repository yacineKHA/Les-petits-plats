/**
 * Visibilité du bouton de suppression de recherche texte.
 * Si le champ de recherche n'est pas vide, le bouton de suppression est affiché.
 * Sinon, il est caché.
 * @param {HTMLElement} input - Input de recherche
 * @param {HTMLElement} deleteButton - Bouton de suppression
 */
export function setVisibilityOfDeleteSearchTextButton(input, deleteButton) {
    if (input.value.length >= 1) {
        deleteButton.classList.remove('invisible');
    } else {
        deleteButton.classList.add('invisible');
    }
}