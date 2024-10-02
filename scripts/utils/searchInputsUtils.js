export function setVisibilityOfDeleteSearchTextButton(input, deleteButton) {
    if(input.value.length >= 1) {
        deleteButton.classList.remove('invisible');
    } else {
        deleteButton.classList.add('invisible');
    }
}