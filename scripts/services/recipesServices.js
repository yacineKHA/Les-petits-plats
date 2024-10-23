import { displayCards, initializeFiltersInDropdownMenus } from "../pages/index.js";
import { searchByRecipesAndIngredients } from "../ui/searchBar.js";
import { filterByAppliance, filterByIngredients, filterByUstensils } from "../utils/dropdownMenuUtils.js";

/**
 * Récupère les recettes du fichier recipes.json et filtre éventuellement ces recettes
 * en fonction des filtres de recherche et des éléments de filtre sélectionnés.
 * @param {string} [searchValue] - Valeur de recherche saisie par l'utilisateur.
 * @param {Object} [selectedFilters] - Filtres de recherche sélectionnés par l'utilisateur.
 * @returns {Promise<Array>} - La liste des recettes filtrées.
 */
export async function fetchRecipes(searchValue = null, selectedFilters = {}) {
    try {
        const response = await fetch('/data/recipes.json');
        if (!response.ok) {
            console.error(`Erreur HTTP Status: ${response.status}`);
        }
        const recipes = await response.json();

        return filterRecipesWithFilters(recipes, selectedFilters, searchValue);

    } catch (error) {
        console.error('Erreur lors de la récupération des recettes: ', error);
        return [];
    }
}

//version 2
/**
* Filtre les recettes en fonction de la valeur de recherche saisie par l'utilisateur.
* @param {Array} recipes - Liste des recettes à filtrer.
* @param {string} searchValue - Valeur de recherche saisie par l'utilisateur.
* @returns {Array} - Liste des recettes filtrées.
*/
export function searchRecipes(recipes, searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.description.toLowerCase().includes(lowerCaseSearchValue)) {
            filteredRecipes.push(recipe);
        } else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(lowerCaseSearchValue)) {
                    filteredRecipes.push(recipe);
                    break;
                }
            }
        }
    }

    return filteredRecipes;
}

/**
 * Filtre les recettes en fonction des filtres de recherche et des éléments de filtre sélectionnés.
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @param {Object} selectedFilters - Filtres de recherche sélectionnés.
 * @param {string} searchValue - Valeur de recherche saisie par l'utilisateur (optionnel).
 * @returns {Array} - Liste des recettes filtrées.
 */
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

/**
 * Renvoie un Set contenant les éléments uniques du tableau de recettes
 * filtrés en fonction de "elementsToFilter"
 * Si "array" est à true, on considère que "elementsToFilter" est un tableau
 * d'éléments et qu'il faut extraire les éléments de ce tableau.
 * Si "element" est fourni, on extrait la propriété correspondante de chaque élément.
 * @param {array} recipes - Tableau de recettes
 * @param {string} elementsToFilter - Eléments à filtrer
 * @param {string} element - Nom de la propriété à extraire (si array est à true)
 * @param {boolean} isArray - True si elementsToFilter est un tableau
 * @returns {Set} - Ensemble des éléments uniques
 */
export function getFilteredUniqueItems(recipes, elementsToFilter, element = null, isArray = false) {
    const itemsSet = new Set();

    if (isArray) {
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


/**
 * Met à jour les cards et les filtres en fonction de la valeur de recherche saisie
 * par l'utilisateur dans le champ de recherche.
 * @returns {Promise<Boolean>} - Renvoie true si la mise à jour a réussie sinon false
 */
export async function updateCardsAndFilters() {
    const input = document.getElementById('searchbar-input');

    try {
        const result = await searchByRecipesAndIngredients(input, initializeFiltersInDropdownMenus, displayCards);
        return result;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des cards et filtres: ', error);
    }
}
