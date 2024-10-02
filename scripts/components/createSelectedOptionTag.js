import { updateCardsAndFilters } from "../services/recipesServices.js";
import { getAllSelectedValuesInDropdownFilters } from "../ui/dropdownMenus.js";

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
    if (parentId.includes('ingredients')) {
        category = 'ingredients';
    } else if (parentId.includes('appliances')) {
        category = 'appliances';
    } else if (parentId.includes('ustensils')) {
        category = 'ustensils';
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
function removeOptionTag(imgButton) {
    imgButton.addEventListener("click", () => {
        const parentElement = imgButton.parentElement;

        console.log('parent: ', parentElement)
        const valueOfOptionTag = parentElement.textContent;
        const categoryOfElement = parentElement.getAttribute("data-category");

        const getAllOptionsTagsValues = getAllSelectedValuesInDropdownFilters();

        if (!getAllOptionsTagsValues || !getAllOptionsTagsValues[categoryOfElement]) {
            console.error("La catégorie n'existe pas dans la liste des options.");
            return;
        }

        const result = getAllOptionsTagsValues[categoryOfElement].some((element) => {
            if (element.trim() === valueOfOptionTag.trim()) {
                parentElement.remove();
                updateCardsAndFilters();
                return true;
            }
            return false;
        });

        if(!result) {
            console.error("Impossible de supprimer: Cet élément n'est pas dans la liste");
        }
    });
}

