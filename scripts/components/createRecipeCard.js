import { Recipe } from '../../models/Recipe.js';
import Ingredient from '../../models/Ingredient.js';


/**
 * Crée le conteneur de base pour la card de la recette.
 * @returns {HTMLElement} Conteneur de la card.
 */
function createCardElement() {
    const card = document.createElement('div');
    card.classList.add("card-container");
    return card;
}

// Crée l'image de la recette
function createImageElement(recipe) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-image-container');

    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = `/assets/images/${recipe.image}`;

    imageContainer.appendChild(img);
    return imageContainer;
}

// Crée le titre de la recette
function createTitleElement(recipe) {
    const title = document.createElement('h3');
    title.textContent = recipe.name;
    title.classList.add('card-title');
    return title;
}

// Crée la description de la recette
function createDescriptionElement(recipe) {
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('card-recipe-container');

    const recipeTitle = document.createElement('h4');
    recipeTitle.classList.add('card-recipe-title', 'card-under-title');
    recipeTitle.textContent = 'Recette';

    const recipeDescription = document.createElement('p');
    recipeDescription.classList.add('card-recipe-description');
    recipeDescription.textContent = recipe.description;

    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recipeDescription);
    return recipeContainer;
}

// Crée l'élément des ingrédients de la recette
function createIngredientsElement(recipe) {
    const recipeIngredientsContainer = document.createElement('div');
    recipeIngredientsContainer.classList.add('card-recipe-ingredients-container');

    const recipeIngredientsTitle = document.createElement('h4');
    recipeIngredientsTitle.classList.add('card-recipe-ingredients-title', 'card-under-title');
    recipeIngredientsTitle.textContent = "Ingrédients";

    const ingredientsListContainer = document.createElement("div");
    ingredientsListContainer.classList.add("card-recipe-ingredients-list-container");

    // Ajoute les ingrédients à la liste
    recipe.ingredients.forEach(element => {
        const ingredient = new Ingredient(element.ingredient, element.quantity, element?.unit);
        const ingredientContainer = document.createElement("div");

        const ingredientName = document.createElement("p");
        const ingredientQuantity = document.createElement("p");
        ingredientQuantity.classList.add("card-recipe-ingredients-quantity")

        ingredientName.textContent = ingredient.name;
        ingredientQuantity.textContent = ingredient.quantity
            ? (ingredient.unit ? `${ingredient.quantity} ${ingredient.unit}` : `${ingredient.quantity}`)
            : "-";

        ingredientContainer.appendChild(ingredientName);
        ingredientContainer.appendChild(ingredientQuantity);
        ingredientsListContainer.appendChild(ingredientContainer);
    });

    recipeIngredientsContainer.appendChild(recipeIngredientsTitle);
    recipeIngredientsContainer.appendChild(ingredientsListContainer);
    return recipeIngredientsContainer;
}


/**
* Crée la card de la recette contenant la photo, le nom, la description et les ingrédients.
* @param {Object} data - Données de la recette.
* @returns {HTMLElement} Le conteneur HTML de la card.
*/
export function createRecipeCard(data) {
    const recipe = new Recipe(data.id, data.name, data.servings, data.ingredients, data.time, data.description, data.appliance, data.ustensils, data.image);

    const card = createCardElement();
    const imageElement = createImageElement(recipe);
    const titleElement = createTitleElement(recipe);
    const descriptionElement = createDescriptionElement(recipe);
    const ingredientsElement = createIngredientsElement(recipe);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    cardBody.appendChild(titleElement);
    cardBody.appendChild(descriptionElement);
    cardBody.appendChild(ingredientsElement);

    card.appendChild(imageElement);
    card.appendChild(cardBody);

    return card;
}