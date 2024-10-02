export function deletePreviousDataInCardsAndDropdownMenus() {
    const cardsContainer = document.getElementsByClassName('cards-container')[0];
    cardsContainer.innerHTML = '';
    const dropdownList = Array.from(document.getElementsByClassName('dropdown-list'));
    dropdownList.forEach(list => {
        list.innerHTML = '';
    });
}

