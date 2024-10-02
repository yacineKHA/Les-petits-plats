import { Recipe } from '../../models/Recipe.js';
import Ingredient from '../../models/Ingredient.js';

export function createRecipeCard(data) {

    const recipe = new Recipe(data.id, data.name, data.servings, data.ingredients, data.time, data.description, data.appliance, data.ustensils, data.image);

    // Création de la card
    const card = document.createElement('div');
    card.classList.add("card-container");

    // Conteneur de l'image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-image-container');

    // Création de l'image
    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = `/assets/images/${recipe.image}`;

    // Création du body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Création du titre
    const title = document.createElement('h3');
    title.textContent = recipe.name;
    title.classList.add('card-title');

    // Partie recette
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('card-recipe-container');

    const recipeTitle = document.createElement('h4');
    recipeTitle.classList.add('card-recipe-title', 'card-under-title');
    recipeTitle.textContent = 'Recette';

    const recipeDescription = document.createElement('p');
    recipeDescription.classList.add('card-recipe-description');
    recipeDescription.textContent = recipe.description;

    // Partie ingrédients
    const recipeIngredientsContainer = document.createElement('div');
    recipeIngredientsContainer.classList.add('card-recipe-ingredients-container');

    const recipeIngredientsTitle = document.createElement('h4');
    recipeIngredientsTitle.classList.add('card-recipe-ingredients-title', 'card-under-title');

    recipeIngredientsTitle.textContent = "Ingrédients";

    const ingredientsListContainer = document.createElement("div");
    ingredientsListContainer.classList.add("card-recipe-ingredients-list-container");

    const ingredientsList = recipe.ingredients;

    
    ingredientsList.forEach(element => {
        const ingredient = new Ingredient(element.ingredient, element.quantity, element?.unit);
        const ingredientContainer = document.createElement("div");

        const ingredientName = document.createElement("p");
        const ingredientQuantity = document.createElement("p");
        ingredientQuantity.classList.add("card-recipe-ingredients-quantity")

        ingredientName.textContent = ingredient.name;
        ingredientQuantity.textContent = ingredient.quantity
            ? (ingredient.unit ? `${ingredient.quantity} ${ingredient.unit}` : `${ingredient.quantity}`)
            : "-";

        ingredientContainer.append(ingredientName, ingredientQuantity);
        ingredientsListContainer.appendChild(ingredientContainer);
    });

    recipeIngredientsContainer.append(recipeIngredientsTitle, ingredientsListContainer);

    recipeContainer.append(recipeTitle, recipeDescription);

    // Ajout image au container
    imageContainer.appendChild(img);

    // Ajout éléments au body
    cardBody.append(title, recipeContainer, recipeIngredientsContainer);

    // Ajout éléments au conteneur de la card
    card.append(imageContainer, cardBody);

    return card;
}
