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
        const recipes = await fetchRecipes(searchValue);
        deletePreviousDataInCardsAndSelect();
        args.forEach(arg => {
            arg(recipes);
        });
    }
}

function deletePreviousDataInCardsAndSelect() {
    const cardsContainer = document.getElementsByClassName('cards-container')[0];
    cardsContainer.innerHTML = '';
    const selectElements = Array.from(document.getElementsByClassName('select-style'));
    selectElements.forEach(select => {
        select.options.length = 1;
    });
}

export function deleteSearchInputValue() {
    const btn = document.getElementById('btn-delete-search-text');
    btn.addEventListener('click', () => {
        const input = document.getElementById('searchbar-input');
        input.value = '';
    });
}