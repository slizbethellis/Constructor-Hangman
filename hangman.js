// NPM modules
var inquirer = require("inquirer");
var colors = require("colors/safe");
// user modules
var Word = require("./word.js");

var wordList = ["sinecure", "usufruct", "frowzy", "tonsure", "adduce", "ululate", "farrago", "mulct", "plenary", "samovar", "viand", "codicil", "natation", "mussitate", "logomachy"];
var rounds = 1;

// starts a new round
function startGame() {
  var newWord = new Word(wordList[Math.floor(Math.random() * 15)]);
  if (rounds === 1) {
    console.log(colors.zebra("Welcome to CLI Hangman!\n"));
  }
  else {
    console.log(colors.zebra("Welcome to a new round!\n"));
  }
  rounds++;
  newWord.printWord();
  console.log("\n");
  playGame(newWord);
}

// controls gameplay
function playGame(word) {
  inquirer.prompt([
    {
      type: "input",
      name: "guess",
      message: "Guess a letter!",
      validate: function(value) {
        var range = /[a-zA-Z]+/;
        if (value.length > 1) {
          return "That is not a valid number of characters!";
        }
        else if (value.match(range)) {
          return true;
        }
        else {
          return "That is not a valid letter!";
        }
      }
    }
  ]).then(function(answer) {
    word.checkGuess(answer.guess);
    word.printWord();
    if (word.isFinished() === true) {
      console.log(colors.rainbow("~~~~~~~~~~You win!~~~~~~~~~~\n"));
      askPlayer();
    }
    else if (word.guessesRem === 0) {
      console.log(colors.magenta("You lose! The correct word was: " + word.printRawWord() + ".\n"));
      askPlayer();
    }
    else {
      playGame(word);
    }
  });
}

// asks player if they want to start a new game
function askPlayer() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Would you like to start a new game?",
      default: true
    }
  ]).then(function(answer) {
    if (answer.confirm) {
      console.log(colors.gray("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"));
      startGame();
    }
    else {
      console.log(colors.green("\nSorry to see you go. Bye!"));
    }
  });
}

startGame();
