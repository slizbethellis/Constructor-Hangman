function Letter(letter) {
  this.visible = "_"
  this.letter = letter;
  this.revealed = false;
}

// checks to see if guessed letter matches and changes underscore to letter if they match
Letter.prototype.checkLetter = function(guess) {
  if (guess === this.letter) {
    this.visible = this.letter;
    this.revealed = true;
  }
  return this.revealed;
}

module.exports = Letter;
