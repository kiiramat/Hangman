class Hangman {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        this.countGuesses = 0;
        this._randomClue = RandomUtilities.chooseRandom(Object.keys(categorisedWords));
        this._randomWord = RandomUtilities.chooseRandom(categorisedWords[this._randomClue]);
        this.hiddenWord = RandomUtilities.hide(this._randomWord);
        this.pressedKeys = [];
        this.matchingLetters = false;
        
        //DOM Elements
        this.usedGuesses = null;
        this.wordContainer = null;
        this.word = null;
        this.winMessageContainer = null;
        this.loseMessageContainer = null;
        this.keyboardContainer = null;
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
        guessesContainer.className = "guesses-left";
        const text = document.createElement("p");
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
        this.wordContainer = document.createElement("div");
        this.wordContainer.className = "random-word";
        this.word = document.createElement("h1");
        this.word.innerHTML = RandomUtilities.hide(this._randomWord).join(' ');

        this.wordContainer.append(this.word);
        this.mainContainer.append(this.wordContainer);
    }

    drawYouLoseMessage() {
        this.loseMessageContainer = document.createElement("div");
        this.loseMessageContainer.className = "lose-message hidden";
        const loseMessage = document.createElement("p");
        loseMessage.innerHTML = "You lost!";
        const answer = document.createElement("p");
        answer.innerHTML = `The answer was: ${this._randomWord}`;

        this.loseMessageContainer.append(loseMessage);
        this.loseMessageContainer.append(answer);
        this.mainContainer.append(this.loseMessageContainer);
    }

    drawYouWinMessage() {
        this.winMessageContainer = document.createElement("div");
        this.winMessageContainer.className = "win-message hidden";
        const winMessage = document.createElement("p");
        winMessage.innerHTML = "You won!";

        this.winMessageContainer.append(winMessage);
        this.mainContainer.append(this.winMessageContainer);
    }

    lostGame(reachedMaxGuesses) {
        if (reachedMaxGuesses >= 6) {
            this.wordContainer.classList.add("hidden");
            this.keyboardContainer.classList.add("hidden");
            this.loseMessageContainer.classList.remove("hidden");
        }
    }

    wonGame(word) {
        if (word.indexOf("_") === -1) {
            this.keyboardContainer.classList.add("hidden");
            this.winMessageContainer.classList.remove("hidden");
        }
    }

    matchHiddenLettersAndKeyboardLetters(letter) {
        const wordCharacters = this._randomWord.toLowerCase().split('');
        wordCharacters.forEach((character, index) => {
            if (character === letter && this.hiddenWord[index] === "_") {
                this.matchingLetters = true;
                this.hiddenWord[index] = letter;
            } 
        })
        return this.hiddenWord;
    }
    
    createKeyboard() {
        const keyboard = "abcdefghijklmnopqrstuvwxyz".split('').map(letter => {
            const keyboardButton = ElementUtilities.createButtonElement("keyboard-letter", letter, (event) => {
                if (this.pressedKeys.indexOf(event.srcElement.innerHTML) !== -1 && this.pressedKeys.length !== 0) { return }
                this.pressedKeys.push(event.srcElement.innerHTML);

                this.word.innerHTML = this.matchHiddenLettersAndKeyboardLetters(event.srcElement.innerHTML).join(' ');
                if (this.matchingLetters) {
                    keyboardButton.classList.add("button-green");
                    this.matchingLetters = false;
                } else {
                    keyboardButton.classList.add("button-red");
                    this.usedGuesses.innerHTML = ++this.countGuesses;
                }

                this.wonGame(this.hiddenWord);
                this.lostGame(this.countGuesses);
            });
            return keyboardButton;
        });
        return keyboard;
    }

    drawKeyboard() {
        this.keyboardContainer = document.createElement("div");
        this.keyboardContainer.className = "keyboard"; 
        const keyboardButtons = this.createKeyboard();

        this.keyboardContainer.append(...keyboardButtons);
        this.mainContainer.append(this.keyboardContainer);
    }

    reset() {
        document.querySelector("[hangman-container]").innerHTML = ""
        this.countGuesses = 0;
        this._randomClue = RandomUtilities.chooseRandom(Object.keys(categorisedWords));
        this._randomWord = RandomUtilities.chooseRandom(categorisedWords[this._randomClue]);
        this.hiddenWord = RandomUtilities.hide(this._randomWord); 
        this.word.innerHTML = RandomUtilities.hide(this._randomWord).join(' ');
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
        this.drawYouWinMessage();
        this.drawYouLoseMessage()
        this.drawKeyboard();
        this.drawResetButton();
    }

}