const Hangman = function(word, guesses) {
  this.word = word;
  this.guesses = guesses;
};

const word1 = new Hangman("cat", 3);
console.log(word1);
const word2 = new Hangman("bunti", 3);
console.log(word2);
