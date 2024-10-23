import { createRecipeCard } from "../components/createRecipeCard.js";
import { fetchRecipes, getFilteredUniqueItems } from "../services/recipesServices.js";
import { openDropdrownMenus } from "../ui/dropdownMenus.js";
import { setRecipesCounter } from "../ui/recipesCounter.js";
import { deleteSearchInputValue, searchListener } from "../ui/searchBar.js";
import { addOptionsToDropdownMenus } from "../utils/dropdownMenuUtils.js";
import { noResultFound } from "../utils/noResultUtils.js";


/**
 * Initialise les filtres des ingrédients, appareils et ustensiles avec les valeurs uniques des recettes
 *
 * @param {array} recipes tableau de recettes
 *
 */
export async function initializeFiltersInDropdownMenus(recipes) {
    try {
        if (recipes.length === 0) {

            noResultFound(true);
            console.error('Pas de recettes trouvées');
            return;
        }
        noResultFound(false);
        const ingredients = getFilteredUniqueItems(recipes, 'ingredients', 'ingredient', true);
        const appliances = getFilteredUniqueItems(recipes, 'appliance');
        const ustensils = getFilteredUniqueItems(recipes, 'ustensils', null, true);

        addOptionsToDropdownMenus(ingredients, document.getElementById('ingredients-list'), "ingredients-container");
        addOptionsToDropdownMenus(appliances, document.getElementById('appliances-list'), "appliances-container");
        addOptionsToDropdownMenus(ustensils, document.getElementById('ustensils-list'), "ustensils-container");

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des données des filtres: ', error);
    }
}


/**
 * Affiche la liste des recettes (sous forme de cards)
 *
 * @param {array} recipes Tableau des recettes
 *
 */
export async function displayCards(recipes) {
    try {
        const fragment = document.createDocumentFragment();

        const cardsContainer = document.getElementsByClassName('cards-container')[0];

        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            fragment.appendChild(card);
        });

        // Affiche le nombre de recettes
        setRecipesCounter(recipes.length);
        cardsContainer.appendChild(fragment);

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des cards: ', error);
    }
}

/**
 * Initialise la recherche et suppression du texte de recherche
 */
function initilizeSearchBar() {
    searchListener(initializeFiltersInDropdownMenus, displayCards);
    deleteSearchInputValue(initializeFiltersInDropdownMenus, displayCards);
}


/**
 * Initialise l'application:
 * - Récupère les recettes
 * - Initialise les filtres (ingrédients, appareils, ustensiles)
 * - Affiche les cards
 * - Initialise la recherche et suppression du texte de recherche
 */
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

openDropdrownMenus("ingredients-dropdown", "ingredients-menu");
openDropdrownMenus("appliances-dropdown", "appliances-menu");
openDropdrownMenus("ustensils-dropdown", "ustensils-menu");

init();