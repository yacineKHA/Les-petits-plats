export function createOptionElementForDropdownList(content, selectedList) {
    const div = document.createElement('div');
    div.classList.add("dropdown-options");
    div.textContent = content;
    selectedList.appendChild(div);

    return div;
}