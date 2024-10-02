import { createOptionElementForDropdownList } from "../components/createOptionElementForDropdownList.js";
import { createSelectedOptionTag } from "../components/createSelectedOptionTag.js";
import { displayCards, initializeFiltersInDropdownMenus } from "../pages/index.js";
import { deleteSelectedElementFromDropdown } from "../ui/dropdownMenus.js";
import { searchByRecipesAndIngredients } from "../ui/searchBar.js";

export async function fetchRecipes(searchValue = null, selectedFilters = {}) {
    try {
        const response = await fetch('/data/recipes.json');
        const recipes = await response.json();

        return filterRecipesWithFilters(recipes, selectedFilters, searchValue);

    } catch (error) {
        console.error('Erreur lors de la récupération des recettes: ', error);
    }
}

export function searchRecipes(recipes, searchValue) {

    const lowerCaseSearchValue = searchValue.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||

            // Some => pour verifier si au moins un élément du tableau (ingredients) correspond à la recherche
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseSearchValue))
        );
    });

    return filteredRecipes;
}

export function filterRecipesWithFilters(recipes, selectedFilters, searchValue = null) {
    const { ingredients, appliances, ustensils } = selectedFilters;

    if (searchValue && searchValue.length >= 3) {
        recipes = searchRecipes(recipes, searchValue);
    }

    const filteredRecipes = recipes.filter(recipe => {

        // Filtres par ingrédients
        let matchesIngredients = true;
        if (ingredients && ingredients.length) {
            matchesIngredients = filterByIngredients(ingredients, matchesIngredients, recipe)
        }

        // Filtres par appareils
        let matchesAppliance = true;
        if (appliances && appliances.length) {
            matchesAppliance = filterByAppliance(appliances, matchesAppliance, recipe);
        }

        // Filtres par ustensiles
        let matchesUstensils = true;
        if (ustensils && ustensils.length) {
            matchesUstensils = filterByUstensils(ustensils, matchesUstensils, recipe)
        }

        // Si tous les filtres correspondent, on garde la recette
        return matchesIngredients && matchesAppliance && matchesUstensils;
    });

    return filteredRecipes;
}

function filterByIngredients(ingredients, matchesIngredients, recipe) {
    matchesIngredients = ingredients.every(selectedIngredient =>
        recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
        )
    );
    return matchesIngredients;
}

function filterByAppliance(appliances, matchesAppliance, recipe) {
    matchesAppliance = appliances.every(selectedAppliance =>
        selectedAppliance.toLowerCase() === recipe.appliance.toLowerCase()
    );
    return matchesAppliance;
}

function filterByUstensils(ustensils, matchesUstensils, recipe) {
    matchesUstensils = ustensils.every(selectedUstensil =>
        recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase() === selectedUstensil.toLowerCase()
        )
    );
    return matchesUstensils;
}

export function getFilteredUniqueItems(recipes, elementsToFilter, element = null, array = false) {
    const itemsSet = new Set();

    if (array) {
        recipes.forEach(recipe => {
            recipe[elementsToFilter].forEach(item => {
                itemsSet.add(element === null ? item : item[element]);
            });
        });
    } else {
        recipes.forEach(recipe => {
            itemsSet.add(recipe[elementsToFilter]);
        });
    }

    return itemsSet; // Retourne les éléments uniques grâce à la méthode Set();
}

export function addOptionsToDropdownMenus(itemsSet, selectedList, dropdownId) {
    itemsSet.forEach(item => {
        const option = createOptionElementForDropdownList(item, selectedList);
        handleClickOnSelectedOption(option, dropdownId);
    });
}

export function handleClickOnSelectedOption(option, dropdownId) {
    option.addEventListener("click", async () => {
        try {
            showSelectedOption(option, dropdownId);
            const response = await updateCardsAndFilters();
            console.log("réponse : ", response);
            if(response) {
                deleteSelectedElementFromDropdown(option, dropdownId);
            }
        } catch (error) {
            console.error("Erreur lors du click sur l'option sélectionnée: ", error);
        }
    });
}

function closeDropDownMenu(dropdownContainer) {
    const menu = dropdownContainer.querySelector(".dropdown-menus");
    menu.classList.add("hidden");
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

// Mise à jour des filtres et cards selon filtres et recherches
export async function updateCardsAndFilters() {
    const input = document.getElementById('searchbar-input');

    try {
        const result = await searchByRecipesAndIngredients(input, initializeFiltersInDropdownMenus, displayCards);
        return result;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des cards et filtres: ', error);
    }
}
