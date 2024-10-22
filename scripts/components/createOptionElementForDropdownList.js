/**
 * Crée un élément de liste (une div) pour le menu déroulant d'une des catégories
 * (ingrédients, appareils, ustensiles)
 *
 * @param {String} content - Le texte afficher dans l'élément de liste
 * @param {HTMLElement} selectedList - L'élément HTML qui contient les éléments de liste
 * @returns {HTMLElement} L'élément de liste créé
 */
export function createOptionElementForDropdownList(content, selectedList) {
    const div = document.createElement('div');
    div.classList.add("dropdown-options");
    div.textContent = content;
    selectedList.appendChild(div);

    return div;
}