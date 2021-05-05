class Hangman {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        this.countGuesses = 0;
        this._randomClue = RandomUtilities.chooseRandom(Object.keys(categorisedWords));
        this._randomWord = RandomUtilities.chooseRandom(categorisedWords[this._randomClue]);
        this.hiddenWord = RandomUtilities.hide(this._randomWord);
        
        //DOM Elements
        this.word = null;
        this.usedGuesses = null;
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
        this.usedGuesses.innerHTML = this.countGuesses;

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
        const clue = document.createElement("h2");
        clue.innerHTML = "Clue: " + this._randomClue;

        clueContainer.append(clue);
        this.mainContainer.append(clueContainer);
    }

    drawWord() {
        const wordContainer = document.createElement("div");
        wordContainer.className = "random-word";
        this.word = document.createElement("h1");
        this.word.innerHTML = RandomUtilities.hide(this._randomWord).join(' ');

        wordContainer.append(this.word);
        this.mainContainer.append(wordContainer);
    }

    matchHiddenLettersAndKeyboardLetters(letter) {
        const wordCharacters = this._randomWord.toLowerCase().split('');
        wordCharacters.forEach((character, index) => {
            if (character === letter && this.hiddenWord[index] === "_") {
                this.hiddenWord[index] = letter;
            } 
        })
        return this.hiddenWord;
    }
    
    createKeyboard() {
        const keyboard = "abcdefghijklmnopqrstuvwxyz".split('').map(letter => {
            const keyboardButton = ElementUtilities.createButtonElement("keyboard-letter", letter, (event) => {
                this.word.innerHTML = this.matchHiddenLettersAndKeyboardLetters(event.srcElement.innerHTML).join(' ');
                this.countGuesses += 1;
                this.usedGuesses.innerHTML = this.countGuesses;
            });
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
        document.querySelector("[hangman-container]").innerHTML = ""
        this.countGuesses = 0;
        this._randomClue = RandomUtilities.chooseRandom(Object.keys(categorisedWords));
        this._randomWord = RandomUtilities.chooseRandom(categorisedWords[this._randomClue]);
        this.word.innerHTML = RandomUtilities.hide(this._randomWord).join(' ');
        //@TODO: reset keyboard 
        this.draw();
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