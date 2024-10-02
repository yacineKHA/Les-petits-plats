import { fetchRecipes } from "../services/recipesServices.js";
import { deletePreviousDataInCardsAndDropdownMenus } from "../utils/recipesUtils.js";
import { getAllSelectedValuesInDropdownFilters } from "./dropdownMenus.js";

export function searchListener(...args) {
    const input = document.getElementById('searchbar-input');

    input.addEventListener('input', () => {
        searchByRecipesAndIngredients(input, ...args);
    });
}

export async function searchByRecipesAndIngredients(input, ...cardsAndDropdownsFunctions) {
    const searchValue = input.value;
    let recipes = null;

    try {
        // Conditiion si recherche textuelle
        if (searchValue && searchValue.length >= 3) {
            const deleteBtn = document.getElementById('btn-delete-search-text');
            deleteBtn.classList.remove('invisible');

            recipes = await fetchRecipes(searchValue, getAllSelectedValuesInDropdownFilters());
            
        } else {
            recipes = await fetchRecipes(null, getAllSelectedValuesInDropdownFilters());
        }

        // Si recettes non null
        if (recipes) {
            //Suppression des anciennes données
            deletePreviousDataInCardsAndDropdownMenus();

            // Mise à jour des cards et dropdowns (promise.all pour etre sûr quelles aient terminées
            //avant de passer à la suite)
            await Promise.all(
                cardsAndDropdownsFunctions.map((item) => {
                    item(recipes);
                })
            );

            return recipes;
        }

        
    } catch (error) {
        console.error('Erreur lors de la recherche des recettes : ', error);
    }
}


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