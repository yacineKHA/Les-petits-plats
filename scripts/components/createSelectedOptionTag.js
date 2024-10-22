import { updateCardsAndFilters } from "../services/recipesServices.js";
import { removeSelectedElementFromDropdownList, getAllSelectedValuesInDropdownFilters } from "../ui/dropdownMenus.js";
import { CATEGORIES } from "../utils/categories.js";

/**
 * Crée un tag (Elelement sélectionné dans la liste des filtres) qui contient le nom de l'élément
 * sélectionné et un bouton de suppression.
 *
 * @param {string} selectedItem - Le texte à afficher dans l'élément
 * @param {string} parentId - L'ID du parent (le conteneur des éléments de la catégorie)
 * @returns {HTMLElement} L'élément créé
 */
export function createSelectedOptionTag(selectedItem, parentId) {
    // Création des éléments
    const div = document.createElement("div");
    //const paragraph = document.createElement("p");
    const img = document.createElement("img");

    div.classList.add("dropdown-selected-item");

    div.textContent = selectedItem;

    img.src = "./assets/icons/delete-black.svg";

    const category = selectCategory(parentId);

    //Ajout de la catégorie à la div
    div.setAttribute("data-category", category);

    // Ajout image au conteneur Div
    div.appendChild(img);

    removeOptionTag(img);

    return div;
}

// Identification de la catégorie à partir de l'Id de la div parent
function selectCategory(parentId) {
    if (parentId.includes(CATEGORIES.ingredients)) {
        return CATEGORIES.ingredients;
    } else if (parentId.includes(CATEGORIES.appliances)) {
        return CATEGORIES.appliances;
    } else if (parentId.includes(CATEGORIES.ustensils)) {
        return CATEGORIES.ustensils;
    } else {
        console.error("Le nom de la catégorie ne correspond à aucune existante");
        return null;
    }
}

// Supprime l'option sélectionnée et le supprime de la liste lors du click
function removeOptionTag(imgButton) {
    imgButton.addEventListener("click", async () => {
        const parentElement = imgButton.parentElement;
        const valueOfOptionTag = parentElement.textContent;
        const categoryOfElement = parentElement.getAttribute("data-category");

        const getAllOptionsTagsValues = getAllSelectedValuesInDropdownFilters();

        if (!getAllOptionsTagsValues || !getAllOptionsTagsValues[categoryOfElement]) {
            console.error("La catégorie n'existe pas dans la liste des options.");
            return;
        }
        const elements = getAllOptionsTagsValues[categoryOfElement];

        const isRemoved = await removeElementAndUpdateCards(parentElement, elements, valueOfOptionTag);
        if (!isRemoved) {
            console.error("Impossible de supprimer: Cet élément n'est pas dans la liste.");
            return;
        }
    });
}


/**
* Supprime l'élément parentElement et met à jour les cards et les filtres
* en appelant la fonction updateCardsAndFilters.
* Si la suppression réussie, appelle removeSelectedElementFromDropdownList
* pour supprimer l'élément de la liste des filtres.
*
* @param {HTMLElement} parentElement - L'élément parent à supprimer
* @param {Array} elements - La liste des éléments de la catégorie
* @param {String} valueOfOptionTag - La valeur de l'élément à supprimer
* @return {Promise<Boolean>} - Renvoie true si la suppression a réussie sinon false
*/
async function removeElementAndUpdateCards(parentElement, elements, valueOfOptionTag) {
    for (const element of elements) {
        if (element.trim() === valueOfOptionTag) {
            parentElement.remove();

            // Mise à jour des cards et filtres
            const result = await updateCardsAndFilters();
            if (result) {
                removeSelectedElementFromDropdownList();
                return true;
            }
        }
    }
    return false;
}

