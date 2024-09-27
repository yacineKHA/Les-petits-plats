export function createSelectedOptionTag(selectedItem, parentId) {
    // Création des éléments
    const div = document.createElement("div");
    const paragraph = document.createElement("p");
    const img = document.createElement("img");

    div.classList.add("dropdown-selected-item");

    paragraph.textContent = selectedItem;

    img.src = "./assets/icons/delete-black.svg";

    // Identification de la catégorie à partir de l'Id de la div parent
    let category = '';
    if (parentId.includes('ingredients')) {
        category = 'ingredient';
    } else if (parentId.includes('appliances')) {
        category = 'appliance';
    } else if (parentId.includes('ustensils')) {
        category = 'ustensil';
    }

    //Ajout de la catégorie à la div
    div.setAttribute("data-category",category);

    // Ajout du paragraphe et image au conteneur Div
    div.append(paragraph, img);

    return div;
}

