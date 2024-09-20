import { createRecipeCard } from "../components/createRecipeCard.js";
import { addOptionsToDropdownMenus, fetchRecipes, getFilteredUniqueItems } from "../services/recipesServices.js";
import { dropdrownMenus } from "../ui/dropdownMenus.js";
import { deleteSearchInputValue, searchListener } from "../ui/searchBar.js";


async function initializeFiltersInDropdownMenus(recipes) {
    try {
        if (recipes.length === 0) {
            console.error('Pas de recettes trouvées');
            return;
        }

        const ingredients = getFilteredUniqueItems(recipes, 'ingredients', 'ingredient', true);
        const appliances = getFilteredUniqueItems(recipes, 'appliance');
        const ustensils = getFilteredUniqueItems(recipes, 'ustensils', null, true);

        addOptionsToDropdownMenus(ingredients, document.getElementById('ingredients-select'));
        addOptionsToDropdownMenus(appliances, document.getElementById('appliance-select'));
        addOptionsToDropdownMenus(ustensils, document.getElementById('ustensils-select'));

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
    searchListener(initializeFiltersInDropdownMenus, displayCards);
    deleteSearchInputValue(initializeFiltersInDropdownMenus, displayCards);
}

async function init() {
    try {
        const recipes = await fetchRecipes();
        initializeFiltersInDropdownMenus(recipes);
        displayCards(recipes);
        initilizeSearchBar();
        
    } catch (error) {
        console.error(`Erreur lors de l'init index: `, error);
    }
}

dropdrownMenus();

init();