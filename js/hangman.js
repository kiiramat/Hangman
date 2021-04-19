class Hangman{
    constructor(selector){
        this.mainContainer = document.querySelector(selector);
        this._randomClue = null;
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
        const text = document.createElement("p");
        const clues = Object.keys(cluesAndQuestions);
        this._randomClue = clues[Math.floor(Math.random() * clues.length)];
        text.innerHTML = this._randomClue;

        clueContainer.append(text);
        this.mainContainer.append(clueContainer);
    }

    // wordToBeGuessed() {

    //     console.log(cluesAndQuestions[this._randomClue])
    // }

    drawButton() {
        const buttons = document.createElement("div");
        buttons.className = "reset-button"
        const resetButton = document.createElement("button");
        resetButton.innerHTML = "Reset";
        
        buttons.append(resetButton);
        this.mainContainer.append(buttons);
    }

    draw() {
        this.drawTitleElement();
        this.drawGuessesStillLeft();
        this.drawClue();
        this.wordToBeGuessed();
        this.drawButton();
    }

}