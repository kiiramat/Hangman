const RandomUtilities = {}

RandomUtilities.chooseRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)];
}

RandomUtilities.hide = (word) => {
    return word.split('').map(character => {
        if (character !== " ") {
            return "_";
        } else {
            return "&nbsp;"; //non braking space
        }
    });
}