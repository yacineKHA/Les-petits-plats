import { displayCards, initializeFiltersInDropdownMenus } from "../pages/index.js";
import { searchByRecipesAndIngredients } from "../ui/searchBar.js";
import { filterByAppliance, filterByIngredients, filterByUstensils } from "../utils/dropdownMenuUtils.js";

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
