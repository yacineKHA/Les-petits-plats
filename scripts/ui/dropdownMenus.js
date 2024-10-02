import { setVisibilityOfDeleteSearchTextButton } from "../utils/searchInputsUtils.js";

export function opendropdrownMenus(dropdownId, dropdownMenuId) {
    const itemsDropdown = document.getElementById(dropdownId);
    const itemsMenu = document.getElementById(dropdownMenuId);

    console.log("drp: ", dropdownMenuId)

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

    if(!dropdownsSelectedItem) {
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
        const cat = element.getAttribute("data-category");
        const text = element.textContent;

        // Ajout du texte élément dans la catégorie correspondante
        if(cat) {
            if(cat === "ingredients") {
                arrayOfSelectedItems.ingredients.push(text);
            } else if(cat === "appliances") {
                arrayOfSelectedItems.appliances.push(text);
            } else if(cat === "ustensils") {
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
    const searchInput = dropdownMenu.getElementsByClassName("dropdown-input")[0];
    const deleteBtn = dropdownMenu.getElementsByClassName('dropdown-delete-icon')[0];

    if(!searchInput) {
        console.error("La barre de recherche n'existe pas");
        return;
    }

    searchInput.addEventListener('input', ()=>{
        setVisibilityOfDeleteSearchTextButton(searchInput, deleteBtn);
    });

    deleteButtonOnSearchInputInDropdown(dropdownMenu, searchInput);
}

function deleteButtonOnSearchInputInDropdown(dropdownMenu, searchInput) {
    const deleteBtn = dropdownMenu.getElementsByClassName('dropdown-delete-icon')[0];

    deleteBtn.addEventListener('click', async () => {
        deleteBtn.classList.add('invisible');
        searchInput.value = '';
    });
}

export async function deleteSelectedElementFromDropdown(optionClicked, dropdownId) {
    const parentContainer = document.getElementById(dropdownId);
    console.log("parent: ", parentContainer)
    const list = Array.from(parentContainer.getElementsByClassName("dropdown-options"));
    console.log("list: ", optionClicked.textContent);

    const result = list.some(element => {
        if (element.textContent.trim() === optionClicked.textContent.trim()) {
            console.log("Élément trouvé: ", element);
            element.remove();
            return true;
        }
        return false;
    });

    if (!result) {
        console.warn("Aucun élément correspondant trouvé dans la liste.");
    }
}