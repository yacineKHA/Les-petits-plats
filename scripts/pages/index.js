import { createRecipeCard } from "../components/createRecipeCard.js";
import { addOptionsToSelect, fetchRecipes, getFilteredUniqueItems } from "../services/recipesServices.js";
import { deleteSearchInputValue, searchListener } from "../ui/searchBar.js";


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


async function displayCards(recipes) {
    try {
        const fragment = document.createDocumentFragment();

        const cardsContainer = document.getElementsByClassName('cards-container')[0];

        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            fragment.appendChild(card);
        });

        cardsContainer.appendChild(fragment);

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des cards: ', error);
    }
}

function initilizeSearchBar() {
    searchListener(initializeFilters, displayCards);
    deleteSearchInputValue();
}

async function init() {
    try {
        const recipes = await fetchRecipes();
        initializeFilters(recipes);
        displayCards(recipes);
        initilizeSearchBar();
        
    } catch (error) {
        console.error(`Erreur lors de l'init index: `, error);
    }
}

init();
