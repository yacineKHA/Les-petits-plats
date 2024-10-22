import { createOptionElementForDropdownList } from "../components/createOptionElementForDropdownList.js";
import { createSelectedOptionTag } from "../components/createSelectedOptionTag.js";
import { updateCardsAndFilters } from "../services/recipesServices.js";
import { removeSelectedElementFromDropdownList } from "../ui/dropdownMenus.js";

/**
 * Ajoute les éléments du Set itemsSet à la liste des options du dropdown menu
 * dont l'ID est dropdownId.
 * 
 * @param {Set<string>} itemsSet - Ensemble des éléments à ajouter
 * @param {HTMLElement} selectedList - Liste des éléments de la catégorie
 * @param {string} dropdownId - L'ID du dropdown menu
 */
export function addOptionsToDropdownMenus(itemsSet, selectedList, dropdownId) {
    itemsSet.forEach(item => {
        const option = createOptionElementForDropdownList(item, selectedList);
        handleClickOnSelectedOption(option, dropdownId);
    });
}

/**
 * Ferme le menu déroulant du dropdown
 * 
 * @param {HTMLElement} dropdownContainer - Conteneur du menu déroulant
 */
export function closeDropDownMenu(dropdownContainer) {
    const menu = dropdownContainer.querySelector(".dropdown-menus");
    menu.classList.add("hidden");
}

/**
 * Gestion du click sur les options du dropdown menu. Lorsque celui-ci est cliqué,
 * il s'ajoute à la liste des filtres et met à jour les
 * cards et les filtres en appelant la fonction updateCardsAndFilters.
 * 
 * @param {HTMLElement} option - Option cliquée
 * @param {string} dropdownId - L'ID du conteneur du menu déroulant
 */
export function handleClickOnSelectedOption(option, dropdownId) {
    option.addEventListener("click", async () => {
        try {
            showSelectedOption(option, dropdownId);
            const response = await updateCardsAndFilters();
            if (response) {
                removeSelectedElementFromDropdownList();
            }
        } catch (error) {
            console.error("Erreur lors du click sur l'option sélectionnée: ", error);
        }
    });
}

/**
 * Ajoute le tag correspondant à l'option cliquée dans la liste des filtres
 * et ferme le dropdown.
 * 
 * @param {HTMLElement} option - L'élément HTML de l'option cliquée
 * @param {string} dropdownParentId - L'ID du conteneur du dropdown
 */
export function showSelectedOption(option, dropdownParentId) {
    try {
        // Récupère le container pour y ajouter l'élément
        const dropdownContainer = document.getElementById(dropdownParentId);

        // Création d'un item
        const newSelectedItem = createSelectedOptionTag(option.textContent, dropdownParentId);

        dropdownContainer.appendChild(newSelectedItem);
        closeDropDownMenu(dropdownContainer);

    } catch (error) {
        console.error("Erreur lors de l'affichage de l'option de filtre sélectionnée: ", error);
    }
}

/**
 * Gestion du bouton de suppression du texte de recherche dans le dropdownMenu.
 * Si cliqué, le bouton est caché et le champ de recherche effacé
 * et la liste de tous les éléments du dropdownMenu est réaffiché.
 * 
 * @param {HTMLElement} dropdownMenu - Le menu dropdown qui contient le bouton de suppression et le champ de recherche
 * @param {HTMLElement} searchInput - L'input de recherche
 */
export function deleteButtonOnSearchInputInDropdown(dropdownMenu, searchInput) {
    const deleteBtn = dropdownMenu.querySelector('.dropdown-delete-icon');

    deleteBtn.addEventListener('click', async () => {
        deleteBtn.classList.add('invisible');
        searchInput.value = '';

        const dropdownItems = Array.from(dropdownMenu.querySelectorAll(".dropdown-options"));
        unhideAllElements(dropdownItems);
    });
}

/**
 * Affiche tous les éléments du menu dropdown.
 * 
 * @param  optionsList - Liste des éléments du menu dropdown
 */
export function unhideAllElements(optionsList) {
    optionsList.forEach((option) => {
        option.style.display = 'block';
    });
}


export function filterByIngredients(ingredients, matchesIngredients, recipe) {
    matchesIngredients = ingredients.every(selectedIngredient =>
        recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
        )
    );
    return matchesIngredients;
}


export function filterByAppliance(appliances, matchesAppliance, recipe) {
    matchesAppliance = appliances.every(selectedAppliance =>
        selectedAppliance.toLowerCase() === recipe.appliance.toLowerCase()
    );
    return matchesAppliance;
}

export function filterByUstensils(ustensils, matchesUstensils, recipe) {
    matchesUstensils = ustensils.every(selectedUstensil =>
        recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase() === selectedUstensil.toLowerCase()
        )
    );
    return matchesUstensils;
}