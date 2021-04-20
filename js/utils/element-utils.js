const ElementUtilities = {}

ElementUtilities.createButtonElement = (className, text, func) => {
    const button = document.createElement("button");
    button.className = className;
    button.innerHTML = text;
    button.addEventListener("click", func);

    return button;
}