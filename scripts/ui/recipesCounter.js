/**
 * Affiche le nombre de recettes correspondant aux filtres de recherche
 * @param {number} count - Nombre de recettes
 */
export function setRecipesCounter(count) {
    const recipesCounter = document.getElementById("recipes-numbers");

    recipesCounter.textContent = `${count} recettes`;
}