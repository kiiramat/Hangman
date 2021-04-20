class Hangman{
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        this._randomClue = chooseRandom(Object.keys(categorisedWords));
        this._randomWord = chooseRandom(categorisedWords[this._randomClue]);
    }

    drawTitleElement() {
        const headerContainer = document.createElement("div");
        headerContainer.className = "title";
        const title = document.createElement("h1");
        title.innerHTML = "Hangman";

        headerContainer.append(title);
        this.mainContainer.append(headerContainer);
    }

    drawGuessesStillLeft() {
        const guessesContainer = document.createElement("div");
        guessesContainer.className = "guesses-left";
        guessesContainer.innerHTML = "Wrong Guesses:"; 

        this.mainContainer.append(guessesContainer);
    }

    drawClue() {
        const clueContainer = document.createElement("div");
        clueContainer.className = "clue"
        const text = document.createElement("h2");
        text.innerHTML = "Clue: " + this._randomClue;

        clueContainer.append(text);
        this.mainContainer.append(clueContainer);
    }

    maskWord(word) {
        return word.split('').map(ignored => "_").join(' ');
    }

    drawWord() {
        const wordContainer = document.createElement("div");
        wordContainer.className = "random-word";
        const text = document.createElement("h1");
        text.innerHTML = this.maskWord(this._randomWord);

        wordContainer.append(text);
        this.mainContainer.append(wordContainer);
    }

    createKeyboard() {
        const keyboard = "abcdefghijklmnopqrstuvwxyz".split('').map(letter => {
            const keyboardButton = document.createElement("button");
            keyboardButton.innerHTML = letter;
            return keyboardButton;
        });
        return keyboard;
    }

    drawKeyboard() {
        const keyboardContainer = document.createElement("div");
        keyboardContainer.className = "keyboard"; 
        const keyboardButtons = this.createKeyboard();

        keyboardContainer.append(...keyboardButtons);
        this.mainContainer.append(keyboardContainer);
    }

    drawResetButton() {
        const button = ElementUtilities.createButtonElement("reset-button", "Reset")
        
        this.mainContainer.append(button);
    }

    draw() {
        this.drawTitleElement();
        this.drawGuessesStillLeft();
        this.drawClue();
        this.drawWord();
        this.drawKeyboard();
        this.drawResetButton();
    }

}