import { updateCardsAndFilters } from "../services/recipesServices.js";
import { removeSelectedElementFromDropdownList, getAllSelectedValuesInDropdownFilters } from "../ui/dropdownMenus.js";
import { CATEGORIES } from "../utils/categories.js";

export function createSelectedOptionTag(selectedItem, parentId) {
    // Création des éléments
    const div = document.createElement("div");
    //const paragraph = document.createElement("p");
    const img = document.createElement("img");

    div.classList.add("dropdown-selected-item");

    div.textContent = selectedItem;

    img.src = "./assets/icons/delete-black.svg";

    // Identification de la catégorie à partir de l'Id de la div parent
    let category = '';
    if (parentId.includes(CATEGORIES.ingredients)) {
        category = CATEGORIES.ingredients;
    } else if (parentId.includes(CATEGORIES.appliances)) {
        category = CATEGORIES.appliances;
    } else if (parentId.includes(CATEGORIES.ustensils)) {
        category = CATEGORIES.ustensils;
    } else {
        console.error("Le nom de la catégorie ne correspond à aucune existante");
        return;
    }

    //Ajout de la catégorie à la div
    div.setAttribute("data-category", category);

    // Ajout image au conteneur Div
    div.appendChild(img);

    removeOptionTag(img);

    return div;
}

// Supprime l'option sélectionée lors du click sur le bouton delete, fais ensuite un update.
async function removeOptionTag(imgButton) {
    imgButton.addEventListener("click", async () => {
        const parentElement = imgButton.parentElement;

        console.log('parent: ', parentElement)
        const valueOfOptionTag = parentElement.textContent;
        const categoryOfElement = parentElement.getAttribute("data-category");

        const getAllOptionsTagsValues = getAllSelectedValuesInDropdownFilters();

        if (!getAllOptionsTagsValues || !getAllOptionsTagsValues[categoryOfElement]) {
            console.error("La catégorie n'existe pas dans la liste des options.");
            return;
        }

        const elements = getAllOptionsTagsValues[categoryOfElement];

        for (const element of elements) {
            if (element.trim() === valueOfOptionTag) {
                parentElement.remove();

                // Mise à jour des cards et filtres
                const result = await updateCardsAndFilters();
                if (result) {
                    removeSelectedElementFromDropdownList();
                }
                return;
            }
        }

        console.error("Impossible de supprimer: Cet élément n'est pas dans la liste.");
    });
}

