export function opendropdrownMenus(dropdownId, dropdownMenuId) {
    const itemsDropdown = document.getElementById(dropdownId);
    const itemsMenu = document.getElementById(dropdownMenuId);

    try {
        // Toggle pour ouvrir/fermer le menu
        itemsDropdown.addEventListener('click', () => {
            itemsMenu.classList.toggle('hidden');
        });

        // Ferme le menu si l'utilisateur clique en dehors du dropdown
        document.addEventListener('click', (event) => {
            if (!itemsDropdown.contains(event.target) && !itemsMenu.contains(event.target)) {
                itemsMenu.classList.add('hidden');
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'ouverture des dropdowns: ', error);
    }
}

export function getAllSelectedValuesInDropdownFilters() {
    const dropdownsSelectedItems = Array.from(document.getElementsByClassName("dropdown-selected-item"));

    let arrayOfSelectedItems = {
        ingredients: [],
        appliances: [],
        ustensils: []
    };

    dropdownsSelectedItems.forEach(element =>{
        // Récup de la catégorie
        const cat = element.getAttribute("data-category");
        const text = element.textContent;

        // Ajout du texte élément dans la catégorie correspondante
        if(cat) {
            if(cat === "ingredient") {
                arrayOfSelectedItems.ingredients.push(text);
            } else if(cat === "appliance") {
                arrayOfSelectedItems.appliances.push(text);
            } else if(cat === "ustensil") {
                arrayOfSelectedItems.ustensils.push(text);
            } else {
                console.error(`La data-category de l'élément ne correspond à aucune catégorie attendue`)
            }
        } else {
            console.error(`L'élément ne possède pas de data-category`)
        }
    });

    return arrayOfSelectedItems;
}