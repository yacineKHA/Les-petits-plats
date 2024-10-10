import { createOptionElementForDropdownList } from "../components/createOptionElementForDropdownList.js";
import { createSelectedOptionTag } from "../components/createSelectedOptionTag.js";
import { updateCardsAndFilters } from "../services/recipesServices.js";
import { removeSelectedElementFromDropdownList } from "../ui/dropdownMenus.js";

export function addOptionsToDropdownMenus(itemsSet, selectedList, dropdownId) {
    itemsSet.forEach(item => {
        const option = createOptionElementForDropdownList(item, selectedList);
        handleClickOnSelectedOption(option, dropdownId);
    });
}


export function closeDropDownMenu(dropdownContainer) {
    const menu = dropdownContainer.querySelector(".dropdown-menus");
    menu.classList.add("hidden");
}

export function handleClickOnSelectedOption(option, dropdownId) {
    option.addEventListener("click", async () => {
        try {
            showSelectedOption(option, dropdownId);
            const response = await updateCardsAndFilters();
            if(response) {
                removeSelectedElementFromDropdownList();
            }
        } catch (error) {
            console.error("Erreur lors du click sur l'option sélectionnée: ", error);
        }
    });
}

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

// Supprime le bouton de suppression
export function deleteButtonOnSearchInputInDropdown(dropdownMenu, searchInput) {
    const deleteBtn = dropdownMenu.querySelector('.dropdown-delete-icon');

    deleteBtn.addEventListener('click', async () => {
        deleteBtn.classList.add('invisible');
        searchInput.value = '';

        const dropdownItems = Array.from(dropdownMenu.querySelectorAll(".dropdown-options"));
        unhideAllElements(dropdownItems);
    });
}

// Affiche tous les éléments du menu dropdown
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