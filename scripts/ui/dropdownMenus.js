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