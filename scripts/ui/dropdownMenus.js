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

    let valuesObject = {
        ingredients: [],
        appliance: null,
        ustensils: []
    };

    dropdownsSelectedItems.forEach(element => {

        // Récup l'ID de l'élément sélectionné
        const elementId = element.id;

        // Récup le paragraphe de l'élément sélectionné
        const paragraph = element.querySelector("p");

        if (paragraph && paragraph.textContent) {
            const value = paragraph.textContent.trim();

            // Vérif si son id contient le mot correspondant
            if (elementId.includes('ingredient')) {
                valuesObject.ingredients.push(value);
            } else if (elementId.includes('appliance')) {
                valuesObject.appliance = value;
            } else if (elementId.includes('ustensil')) {
                valuesObject.ustensils.push(value);
            }
        }
    });

    return valuesObject;
}