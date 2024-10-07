import { setVisibilityOfDeleteSearchTextButton } from "../utils/searchInputsUtils.js";
import { CATEGORIES } from '../utils/categories.js';

export function openDropdrownMenus(dropdownId, dropdownMenuId) {
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

        searchInDropdown(itemsMenu)
    } catch (error) {
        console.error('Erreur lors de l\'ouverture des dropdowns: ', error);
    }
}

export function getAllSelectedValuesInDropdownFilters() {
    const dropdownsSelectedItem = document.getElementsByClassName("dropdown-selected-item");

    if (!dropdownsSelectedItem) {
        return console.error("Aucun élément de la classe dropdown-selected-item");
    }

    const dropdownsSelectedItemsArray = Array.from(dropdownsSelectedItem);

    let arrayOfSelectedItems = {
        ingredients: [],
        appliances: [],
        ustensils: []
    };

    dropdownsSelectedItemsArray.forEach(element => {
        // Récup de la catégorie
        const category = element.getAttribute("data-category");
        const text = element.textContent;

        // Ajout du texte élément dans la catégorie correspondante
        if (category) {
            if (category === CATEGORIES.ingredients) {
                arrayOfSelectedItems.ingredients.push(text);
            } else if (category === CATEGORIES.appliances) {
                arrayOfSelectedItems.appliances.push(text);
            } else if (category === CATEGORIES.ustensils) {
                arrayOfSelectedItems.ustensils.push(text);
            } else {
                console.error(`La data-category de l'élément ne correspond à aucune catégorie attendue`)
            }
        } else {
            console.error(`L'élément ne possède pas de data-category`);
        }
    });

    return arrayOfSelectedItems;
}


function searchInDropdown(dropdownMenu) {
    const searchInput = dropdownMenu.querySelector(".dropdown-input");
    const deleteButton = dropdownMenu.querySelector('.dropdown-delete-icon');
    
    if (!searchInput) {
        console.error("La barre de recherche n'existe pas");
        return;
    }

    searchInput.addEventListener('input', (event) => {
        console.log("event: ", event.target.value);
        if (!deleteButton) {
            console.error("Le bouton de suppression n'existe pas");
            return;
        }
        searchInDropdownList(dropdownMenu, event.target.value);
        setVisibilityOfDeleteSearchTextButton(searchInput, deleteButton);
    });

    deleteButtonOnSearchInputInDropdown(dropdownMenu, searchInput);
}

function searchInDropdownList(dropdownMenu, searchInputValue) {
    const dropdownItems = Array.from(dropdownMenu.querySelectorAll(".dropdown-options"));

    if (!dropdownItems || dropdownItems.length === 0) {
        console.error("La liste des éléments n'existe pas");
        return;
    }

    console.log("items: ", searchInputValue);

    if(searchInputValue.length <= 0) {
        unhideAllElements(dropdownItems);
        return;
    }

    dropdownItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
        console.log("value: ", item);
        if (itemText.includes(searchInputValue.toLowerCase().trim())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Supprime le bouton de suppression
function deleteButtonOnSearchInputInDropdown(dropdownMenu, searchInput) {
    const deleteBtn = dropdownMenu.querySelector('.dropdown-delete-icon');
    const dropdownItems = Array.from(dropdownMenu.querySelectorAll(".dropdown-options"));

    deleteBtn.addEventListener('click', async () => {
        deleteBtn.classList.add('invisible');
        searchInput.value = '';
        unhideAllElements(dropdownItems);
    });
}


export function removeSelectedElementFromDropdownList() {
    const getAllSelectedValues = getAllSelectedValuesInDropdownFilters();

    try {
        Object.keys(CATEGORIES).forEach((category) => {
            const container = document.getElementById(`${category}-list`);

            if (!container) {
                console.error(`Le conteneur avec l'ID ${category}-list n'existe pas.`);
                return;
            }

            const options = Array.from(container.getElementsByClassName("dropdown-options"));

            getAllSelectedValues[category].forEach((element) => {
                options.forEach((option) => {
                    if (option.textContent === element) {
                        option.remove();
                    }
                })
            });
        });
    } catch (error) {
        console.error('Erreur lors de la suppression du tag: ', error)
    }
}

// Affiche tous les éléments du menu dropdown
function unhideAllElements(optionsList) {
    optionsList.forEach((option) => {
        option.style.display = 'block';
    });
}
