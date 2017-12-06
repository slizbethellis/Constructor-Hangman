// NPM modules
var colors = require("colors/safe");
// user modules
var Letter = require("./letter.js");

function Word(word) {
  this.guessedLetts = [];
  this.guessesRem = 15;
  this.wordArr = this.makeWord(word);
}

// makes an array of letter objects for word
Word.prototype.makeWord = function(word) {
  var splitWord = word.split("");
  var tempArr = [];
  for (var i = 0; i < splitWord.length; i++) {
    var nextLetter = new Letter(splitWord[i]);
    tempArr.push(nextLetter);
  }
  return tempArr;
}

// displays the word in its current state
Word.prototype.printWord = function() {
  var printString = " ";
  this.wordArr.forEach(letter => {
     printString += letter.visible + " ";
  })
  console.log(colors.cyan(printString));
  if (this.guessesRem != 15) {
    var guessString = " ";
    this.guessedLetts = this.guessedLetts.sort();
    guessString = this.guessedLetts.join(", ");
    console.log(colors.yellow("Letters guessed: ") + guessString);
    console.log(colors.blue("Guesses remaining: " + this.guessesRem) + "\n");
  }
}

// displays the complete word
Word.prototype.printRawWord = function() {
  var printString = " ";
  this.wordArr.forEach(letter => {
     printString += letter.letter;
  })
  return printString;
}

// checks all of the letters in the word for the guessed letter
Word.prototype.checkGuess = function(guess) {
  if (!this.guessedLetts.includes(guess.toLowerCase())) {
    this.guessedLetts.push(guess.toLowerCase());
    this.guessesRem--;
    for (var i = 0; i < this.wordArr.length; i++) {
      this.wordArr[i].checkLetter(guess);
    }
  }
}

// checks if word is finished
Word.prototype.isFinished = function() {
  var finished = true;
  for (var i = 0; i < this.wordArr.length; i++) {
    if (!this.wordArr[i].revealed) {
      finished = false;
    }
  }
  return finished;
}

module.exports = Word;
