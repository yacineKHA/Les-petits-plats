import { createRecipeCard } from "../components/createRecipeCard.js";
import { addOptionsToSelect, fetchRecipes, getFilteredUniqueItems } from "../services/recipesServices.js";

async function initializeFilters(recipes) {
    try {
        if (recipes.length === 0) {
            console.error('Pas de recettes trouvées');
            return;
        }

        const ingredients = getFilteredUniqueItems(recipes, 'ingredients', 'ingredient', true);
        const appliances = getFilteredUniqueItems(recipes, 'appliance');
        const ustensils = getFilteredUniqueItems(recipes, 'ustensils', null, true);

        addOptionsToSelect(ingredients, document.getElementById('ingredients-select'));
        addOptionsToSelect(appliances, document.getElementById('appliance-select'));
        addOptionsToSelect(ustensils, document.getElementById('ustensils-select'));

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des filtres: ', error);
    }
}

async function searchByRecipesAndIngredients(input) {
    let searchValue;
    searchValue = input.value;
    console.log('searchValue: ', searchValue);
    if (searchValue.length >= 3) {
        const recipes = await fetchRecipes(searchValue);
        deletePreviousData();
        initializeFilters(recipes);
        displayCards(recipes);
    }
}

function searchListener() {
    const input = document.getElementById('searchbar-input');
    
    input.addEventListener('input', () => {
        searchByRecipesAndIngredients(input);
    });
}

function deletePreviousData() {
    const cardsContainer = document.getElementsByClassName('cards-container')[0];
    cardsContainer.innerHTML = '';
    const ingredientsSelect = Array.from(document.getElementsByClassName('select-style'));
    ingredientsSelect.forEach(select => {
        select.options.length = 1;
    });
}

function deleteSearchInput() {
    const btn = document.getElementById('btn-delete-search-text');
    btn.addEventListener('click', () => {
        const input = document.getElementById('searchbar-input');
        input.value = '';
    });
}

deleteSearchInput();

async function displayCards(recipes) {
    try {
        const cardsContainer = document.getElementsByClassName('cards-container')[0];
        console.log('cardsContainer', cardsContainer);

        recipes.forEach(recipe => {
            console.log('recipe', recipe);
            const card = createRecipeCard(recipe);
            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des cards: ', error);
    }
}

async function init() {
    try {
        const recipes = await fetchRecipes();
        initializeFilters(recipes);
        displayCards(recipes);
        
    } catch (error) {
        console.error(`Erreur lors de l'init index: `, error);
    }
}

searchListener();
document.addEventListener('DOMContentLoaded', init);

