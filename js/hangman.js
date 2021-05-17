class Hangman {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        this.countGuesses = 0;
        this.maxGuesses = 6;
        this._randomClue = RandomUtilities.chooseRandom(Object.keys(categorisedWords));
        this._randomWord = RandomUtilities.chooseRandom(categorisedWords[this._randomClue]);
        this.hiddenWord = RandomUtilities.hide(this._randomWord);
        this.pressedKeysCollection = [];
        this.matchingLetters = false;
        this.hangmanImage = document.querySelector('[hangman-image]');
        this.guessesID = [];
        
        //DOM Elements
        this.usedGuesses = null;
        this.wordContainer = null;
        this.word = null;
        this.winMessageContainer = null;
        this.loseMessageContainer = null;
        this.keyboardContainer = null;
    }

    draw() {
        this.drawTitleElement();
        this.relocateHangmanDrawing();
        this.drawUsedGuesses();
        this.drawClue();
        this.drawWord();
        this.drawYouWinMessage();
        this.drawYouLoseMessage()
        this.drawKeyboard();
        this.drawResetButton();
    }

    drawTitleElement() {
        const headerContainer = document.createElement("div");
        headerContainer.className = "title-container";
        const title = document.createElement("h1");
        title.innerHTML = "Hangman";

        headerContainer.append(title);
        this.mainContainer.append(headerContainer);
    }

    relocateHangmanDrawing() {
        const hangmanImageContainer = this.hangmanImage;
        hangmanImageContainer.setAttributeNS(null, 'class', 'hangman-image');

        this.mainContainer.append(hangmanImageContainer);
    }

    drawUsedGuesses() {
        const guessesContainer = document.createElement("div");
        guessesContainer.className = "guesses-container";
        const text = document.createElement("p");
        text.innerHTML = "Wrong Guesses: ";

        this.usedGuesses = document.createElement("span");
        this.usedGuesses.innerHTML = this.countGuesses;

        const maxGuesses = document.createElement("span");
        maxGuesses.innerHTML = ` of ${this.maxGuesses}`;

        guessesContainer.append(text);
        text.append(this.usedGuesses);
        text.append(maxGuesses);
        this.mainContainer.append(guessesContainer);
    }

    drawClue() {
        const clueContainer = document.createElement("div");
        clueContainer.className = "clue-container"
        const clue = document.createElement("h2");
        clue.innerHTML = "Clue: " + this._randomClue;

        clueContainer.append(clue);
        this.mainContainer.append(clueContainer);
    }

    drawWord() {
        this.wordContainer = document.createElement("div");
        this.wordContainer.className = "word-container";
        this.word = document.createElement("h1");
        this.word.innerHTML = RandomUtilities.hide(this._randomWord).join(' ');

        this.wordContainer.append(this.word);
        this.mainContainer.append(this.wordContainer);
    }

    drawYouWinMessage() {
        this.winMessageContainer = document.createElement("div");
        this.winMessageContainer.className = "win-message-container hidden";
        const winMessage = document.createElement("p");
        winMessage.innerHTML = "You won!";

        this.winMessageContainer.append(winMessage);
        this.mainContainer.append(this.winMessageContainer);
    }


    drawYouLoseMessage() {
        this.loseMessageContainer = document.createElement("div");
        this.loseMessageContainer.className = "lose-message-container hidden";
        const loseMessage = document.createElement("p");
        loseMessage.innerHTML = "You lost!";
        const answer = document.createElement("p");
        answer.innerHTML = "The answer was: ";
        const randomWordElement = document.createElement("span");
        randomWordElement.className = "random-word-element";
        randomWordElement.innerHTML = ` ${this._randomWord} `


        this.loseMessageContainer.append(loseMessage);
        this.loseMessageContainer.append(answer);
        answer.append(randomWordElement);
        this.mainContainer.append(this.loseMessageContainer);
    }

    drawKeyboard() {
        this.keyboardContainer = document.createElement("div");
        this.keyboardContainer.className = "keyboard-container"; 
        const keyboardButtons = this.createKeyboard();

        this.keyboardContainer.append(...keyboardButtons);
        this.mainContainer.append(this.keyboardContainer);
    }
    
    createKeyboard() {
        const keyboard = "abcdefghijklmnopqrstuvwxyz".split('').map(letter => {
            const keyboardButton = ElementUtilities.createButtonElement("keyboard-letter", letter, (event) => {
                const letter = event.srcElement.innerHTML;
                if (this.hasLetterBeenPressed(letter)) {
                    return;
                };
                this.pressedKeysCollection.push(letter);

                const replacedWord = this.replaceWithLetter(letter).join(' ');
                const matchingLetterFound = this.word.innerHTML !== replacedWord;
                this.word.innerHTML = replacedWord;
                if (matchingLetterFound) {
                    keyboardButton.classList.add("button-green");
                } else {
                    keyboardButton.classList.add("button-red");
                    this.usedGuesses.innerHTML = ++this.countGuesses;
                    this.showHumanPart(this.countGuesses);
                }

                this.wonGame(this.hiddenWord);
                this.lostGame(this.countGuesses);
            });
            return keyboardButton;
        });
        return keyboard;
    }

    hasLetterBeenPressed(letter) {
        return this.pressedKeysCollection.indexOf(letter) !== -1;
    }

    replaceWithLetter(letter) {
        const wordCharacters = this._randomWord.toLowerCase().split('');
        wordCharacters.forEach((character, index) => {
            if (character === letter && this.hiddenWord[index] === "_") {
                this.hiddenWord[index] = letter;
            } 
        })
        return this.hiddenWord;
    }

    showHumanPart(guessCount) {
        const humanParts = document.querySelector(`[guess="${guessCount}"]`);
        humanParts.setAttributeNS(null, "style", "opacity:1");
    }

    wonGame(word) {
        if (word.indexOf("_") === -1) {
            this.keyboardContainer.classList.add("hidden");
            this.winMessageContainer.classList.remove("hidden");
        }
    }

    lostGame(guesses) {
        if (guesses >= this.maxGuesses) {
            this.wordContainer.classList.add("hidden");
            this.keyboardContainer.classList.add("hidden");
            this.loseMessageContainer.classList.remove("hidden");
        }
    }

    drawResetButton() {
        const resetButtonContainer = document.createElement("div");
        resetButtonContainer.className = "reset-button-container";
        const resetButton = ElementUtilities.createButtonElement("reset-button", "Reset", () => {
            this.reset();
        });
        
        resetButtonContainer.append(resetButton);
        this.mainContainer.append(resetButtonContainer);
    }

    reset() {
        this.resetHangmanImage();
        this.mainContainer.innerHTML = "";
        this.countGuesses = 0;
        this._randomClue = RandomUtilities.chooseRandom(Object.keys(categorisedWords));
        this._randomWord = RandomUtilities.chooseRandom(categorisedWords[this._randomClue]);
        this.hiddenWord = RandomUtilities.hide(this._randomWord); 
        this.word.innerHTML = RandomUtilities.hide(this._randomWord).join(' ');
        this.pressedKeysCollection = [];

        this.draw();
    }

    resetHangmanImage() {
        [...document.querySelectorAll(`[guess]`)].forEach(element => {
            element.setAttributeNS(null, "style", "opacity:0");
        })
    }
}