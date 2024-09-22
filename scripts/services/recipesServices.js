export async function fetchRecipes(searchValue = null) {
    try {
        const response = await fetch('/data/recipes.json');
        const recipes = await response.json();

        if (searchValue && searchValue.length >= 3) {
            return searchRecipes(recipes, searchValue);
        }
        
        return recipes;
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes: ', error);
    }
}

export function searchRecipes(recipes, searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
            recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||

            // Some => pour verifier si au moins un élément du tableau (ingredients) correspond à la recherche
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseSearchValue))
        );
    });
}

export function getFilteredUniqueItems(recipes, elementsToFilter, element = null, array = false) {
    const itemsSet = new Set();

    if (array) {
        recipes.forEach(recipe => {
            recipe[elementsToFilter].forEach(item => {
                itemsSet.add(element === null ? item : item[element]);
            });
        });
    } else {
        recipes.forEach(recipe => {
            itemsSet.add(recipe[elementsToFilter]);
        });
    }

    return itemsSet; // Retourne les éléments uniques grâce à la méthode Set();
}

export function addOptionsToDropdownMenus(itemsSet, elementSelected) {
    itemsSet.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        elementSelected.appendChild(div);
    });
}