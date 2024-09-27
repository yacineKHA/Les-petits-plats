import { createOptionElementForDropdownList } from "../components/createOptionElementForDropdownList.js";
import { displayCards, initializeFiltersInDropdownMenus } from "../pages/index.js";
import { getAllSelectedValuesInDropdownFilters } from "../ui/dropdownMenus.js";
import { searchByRecipesAndIngredients } from "../ui/searchBar.js";

export async function fetchRecipes(searchValue = null, selectedFilters = []) {
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
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||

            // Some => pour verifier si au moins un élément du tableau (ingredients) correspond à la recherche
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseSearchValue))
        );
    });
}

export function filterRecipesWithFilters(recipes, selectedFilters, searchValue = null) {
    const { ingredients, appliance, ustensils } = selectedFilters;

    console.log("val: ", selectedFilters);

    if (searchValue && searchValue.length >= 3) {
        recipes = searchRecipes(recipes, searchValue); 
    }

    const filteredRecipes = recipes.filter(recipe => {

        // Filtres par ingrédients
        let matchesIngredients = true;
        if (ingredients && ingredients.length) {
            matchesIngredients = ingredients.every(selectedIngredient =>
                recipe.ingredients.some(ingredient => 
                    ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
                )
            );
        }

        // Filtres par appareils
        let matchesAppliance = true;
        if (appliance) { 
            matchesAppliance = appliance.toLowerCase() === recipe.appliance.toLowerCase();
        }

        // Filtres par ustensiles
        let matchesUstensils = true;
        if (ustensils && ustensils.length) {
            matchesUstensils = ustensils.every(selectedUstensil =>
                recipe.ustensils.some(ustensil => 
                    ustensil.toLowerCase() === selectedUstensil.toLowerCase()
                )
            );
        }

        // Si tous les filtres correspondent, on garde la recette
        return matchesIngredients && matchesAppliance && matchesUstensils;
    });
   
    return filteredRecipes;
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

export async function handleClickOnSelectedOption(option, dropdownId) {
    option.addEventListener("click", async () => {
        showSelectedOption(option, dropdownId);
        updateCardsAndFilters();
    });
}

function closeDropDownMenu(dropdownContainer) {
    const menu = dropdownContainer.querySelector(".dropdown-menus");
    menu.classList.add("hidden");
}

export function showSelectedOption(option, dropdownId) {
    try {
        const dropdownContainer = document.getElementById(dropdownId);
        
        const selectedItem = dropdownContainer.querySelector(".dropdown-selected-item");
        selectedItem.classList.remove("invisible");

        const paragraph = dropdownContainer.querySelector("p");
        paragraph.textContent = option.textContent;

        closeDropDownMenu(dropdownContainer);

    } catch (error) {
        console.error("Erreur lors de l'affichage de l'option de filtre sélectionnée: ", error);
    }
}

// Mise à jour des filtres et cards selon filtres et recherches
export async function updateCardsAndFilters() {
    const input = document.getElementById('searchbar-input');
    
    searchByRecipesAndIngredients(input, initializeFiltersInDropdownMenus, displayCards)
}