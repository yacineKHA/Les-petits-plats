import { fetchRecipes } from "../services/recipesServices.js";
import { deletePreviousDataInCardsAndDropdownMenus } from "../utils/recipesUtils.js";
import { getAllSelectedValuesInDropdownFilters } from "./dropdownMenus.js";

/**
 * Met en place un listener sur l'input de la barre de recherche
 * @param  {...Function} args - Les fonctions à appeler avec les recettes filtrées 
 *                              en argument.
 */
export function searchListener(...args) {
    const input = document.getElementById('searchbar-input');

    input.addEventListener('input', () => {
        searchByRecipesAndIngredients(input, ...args);
    });
}

/**
 * Recherche des recettes en fonction de du texte entré par l'utilisateur
 * @param {HTMLInputElement} input - L'input barre de recherche
 * @param  {...Function} cardsAndDropdownsFunctions - Les fonctions de mises à jour
 * de la liste des cards et des dropdowns.
 * @returns {Promise<Array<Recipe>>} - La liste des recettes filtrées.
 */
export async function searchByRecipesAndIngredients(input, ...cardsAndDropdownsFunctions) {
    const searchValue = input.value;
    let recipes = null;

    try {
        // Conditiion si recherche textuelle
        if (searchValue && searchValue.length >= 3) {
            removeDeleteButton();
            recipes = await fetchRecipes(searchValue, getAllSelectedValuesInDropdownFilters());

        } else {
            recipes = await fetchRecipes(null, getAllSelectedValuesInDropdownFilters());
        }

        // Si recettes non null
        if (recipes) {
            //Suppression des anciennes données
            deletePreviousDataInCardsAndDropdownMenus();

            await updateUI(recipes, cardsAndDropdownsFunctions);

            return recipes;
        }
    } catch (error) {
        console.error('Erreur lors de la recherche des recettes : ', error);
    }
}

/**
 * Visibilité du bouton de suppression du texte
 */
function removeDeleteButton() {
    const deleteBtn = document.getElementById('btn-delete-search-text');
    deleteBtn.classList.remove('invisible');
}

/**
 * Met à jour l'interface utilisateur en appelant les fonctions de mises à jour
 * des cards et des dropdowns.
 * @param {Array} recipes - Liste des recettes à afficher
 * @param {Array<Function>} cardsAndDropdownsFunctions - Les fonctions de mises à jour
 * de la liste des cards et des dropdowns.
 */
async function updateUI(recipes, cardsAndDropdownsFunctions) {
    if (recipes) {
        //Suppression des anciennes données
        deletePreviousDataInCardsAndDropdownMenus();

        // Mise à jour des cards et dropdowns (promise.all pour etre sûr quelles aient terminées
        // avant de passer à la suite)
        await Promise.all(
            cardsAndDropdownsFunctions.map((item) => {
                item(recipes);
            })
        );
    }
}

/**
 * Ajoute un listener sur le bouton de delete du texte de recherche qui
 * supprime le texte de recherche et met à jour les cards et les dropdowns en conséquence.
 * @param  {...Function} cardsAndDropdownsFunctions Les fonctions de mises à jour
 * de la liste des cards et des dropdowns.
 */
export function deleteSearchInputValue(...cardsAndDropdownsFunctions) { 
    const deleteBtn = document.getElementById('btn-delete-search-text');

    deleteBtn.addEventListener('click', async () => {
        const input = document.getElementById('searchbar-input');
        deleteBtn.classList.add('invisible');
        input.value = '';

        // Récup des recettes sans filtres de recherches
        const recipes = await fetchRecipes(null, getAllSelectedValuesInDropdownFilters());

        //Suppression des anciennes données
        deletePreviousDataInCardsAndDropdownMenus();

        cardsAndDropdownsFunctions.forEach(item => {
            item(recipes);
        });
    });
}