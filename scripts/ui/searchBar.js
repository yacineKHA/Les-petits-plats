import { fetchRecipes } from "../services/recipesServices.js";

export function searchListener(...args) {
    const input = document.getElementById('searchbar-input');
    
    input.addEventListener('input', () => {
        searchByRecipesAndIngredients(input, ...args);
    });
}

async function searchByRecipesAndIngredients(input, ...args) {
    let searchValue;
    searchValue = input.value;
    if (searchValue.length >= 3) {
        const deleteBtn = document.getElementById('btn-delete-search-text');
        deleteBtn.classList.remove('invisible');
        const recipes = await fetchRecipes(searchValue);
        deletePreviousDataInCardsAndDropdownMenus();
        args.forEach(arg => {
            arg(recipes);
        });
    }
}

/* Recharger les données des cards et des selects avec les données de base
export async function reloadCardsAndSelectsData(...args) {
    const recipes = await fetchRecipes();
    deletePreviousDataInCardsAndSelect();
    args.forEach(arg => {
        arg(recipes);
    });
}*/

function deletePreviousDataInCardsAndDropdownMenus() {
    const cardsContainer = document.getElementsByClassName('cards-container')[0];
    cardsContainer.innerHTML = '';
    const selectElements = Array.from(document.getElementsByClassName('dropdown-menu'));
    selectElements.forEach(select => {
        select.options.length = 1;
    });
}

export function deleteSearchInputValue() {
    const deleteBtn = document.getElementById('btn-delete-search-text');
    deleteBtn.addEventListener('click', () => {
        const input = document.getElementById('searchbar-input');
        deleteBtn.classList.add('invisible');
        input.value = '';
        //reloadCardsAndSelectsData(...args);
    });
}