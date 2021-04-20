class Hangman{
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        this._randomClue = chooseRandom(Object.keys(categorisedWords));
        this._randomWord = chooseRandom(categorisedWords[this._randomClue]);

        //DOM Elements
        this.usedGuesses = "0";
        this.wrongGuessesCount = "0";
        this.clue = null;
        this.word = null;
    }

    drawTitleElement() {
        const headerContainer = document.createElement("div");
        headerContainer.className = "title";
        const title = document.createElement("h1");
        title.innerHTML = "Hangman";

        headerContainer.append(title);
        this.mainContainer.append(headerContainer);
    }

    drawUsedGuesses() {
        const guessesContainer = document.createElement("div");
        const text = document.createElement("p");
        text.className = "guesses-left";
        text.innerHTML = "Wrong Guesses: ";

        this.usedGuesses = document.createElement("span");
        this.usedGuesses.innerHTML = this.wrongGuessesCount;

        const maxGuesses = document.createElement("span");
        maxGuesses.innerHTML = " of 6";

        guessesContainer.append(text);
        text.append(this.usedGuesses);
        text.append(maxGuesses);
        this.mainContainer.append(guessesContainer);
    }

    drawClue() {
        const clueContainer = document.createElement("div");
        clueContainer.className = "clue"
        this.clue = document.createElement("h2");
        this.clue.innerHTML = "Clue: " + this._randomClue;

        clueContainer.append(this.clue);
        this.mainContainer.append(clueContainer);
    }

    maskWord(word) {
        return word.split('').map(ignored => "_").join(' ');
    }

    drawWord() {
        const wordContainer = document.createElement("div");
        wordContainer.className = "random-word";
        this.word = document.createElement("h1");
        this.word.innerHTML = this.maskWord(this._randomWord);

        wordContainer.append(this.word);
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

    reset() {
        this.usedGuesses.innerHTML = "0";
        this.clue.innerHTML = "Clue: " + this._randomClue;;
        this.word.innerHTML = this.maskWord(this._randomWord);
        //@TODO: reset keyboard
    }

    drawResetButton() {
        const resetButton = ElementUtilities.createButtonElement("reset-button", "Reset", () => {
            this.reset();
        });
        
        this.mainContainer.append(resetButton);
    }

    draw() {
        this.drawTitleElement();
        this.drawUsedGuesses();
        this.drawClue();
        this.drawWord();
        this.drawKeyboard();
        this.drawResetButton();
    }

}