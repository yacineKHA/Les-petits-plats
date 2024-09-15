import { Recipe } from '../../models/Recipe.js';

export function createRecipeCard(data) {

    const recipe = new Recipe(data.id, data.name, data.servings, data.ingredients, data.time, data.description, data.appliance, data.ustensils, data.image);

    // Création de la card
    const card = document.createElement('div');
    card.classList.add('bg-white', 'h-[731px]','w-[380px]' ,"m-0", 'flex','flex-col', 'shadow-md', 'rounded-[21px]', 'overflow-hidden', 'm-4');

    // Conteneur de l'image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('relative', 'w-full', 'h-[253px]', 'overflow-hidden');

    // Création de l'image
    const img = document.createElement('img');
    img.classList.add('card-img-top', 'w-full','object-cover', 'center', 'h-full');
    img.src = `/assets/images/${recipe.image}`;

    // Création du body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', "w-full", 'p-8');

    // Création du titre
    const title = document.createElement('h3');
    title.textContent = recipe.name;
    title.classList.add('card-title');

    // Partie recette
    const recipeContainer =  document.createElement('div');
    recipeContainer.classList.add('card-recipe-container');

    const recipeTitle = document.createElement('h4');
    recipeTitle.classList.add('card-recipe-title');
    recipeTitle.textContent = 'Recette';

    const recipeDescription = document.createElement('p');
    recipeDescription.classList.add('card-recipe-description');
    recipeDescription.textContent = recipe.description;

    // Partie ingrédients
    const recipeIngredientsContainer = document.createElement('div');
    recipeIngredientsContainer.classList.add('card-recipe-ingredients-container');

    const recipeIngredientsTitle = document.createElement('h4');
    recipeIngredientsTitle.classList.add('card-recipe-ingredients-title');

    const recipeIngredients = document.createElement('p');

    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recipeDescription);

    // Ajout image au container
    imageContainer.appendChild(img);

    // Ajout éléments au body
    cardBody.appendChild(title);
    cardBody.appendChild(recipeContainer);

    // Ajout éléments au conteneur de la card
    card.appendChild(imageContainer);
    card.appendChild(cardBody);

    return card;
}
