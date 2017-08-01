"use strict";
var HangmanApp = (function HangmanApp(App) {

	init();

	App.Hangman = {
		enterGuess: enterGuess,
		newWord: newWord,
		checkGameStatus: checkGameStatus,
	};
	return App;

	function init() {}

	function enterGuess(letter) {
		App.WordModel.lettersGuessed.push(letter);
		App.Stats.remainingGuesses--;

		App.WordModel.updateScrubbedWord();
		checkGameStatus();
	}

	function newWord(callback) {
		App.WordService.getWord()
			.then(function(fulfilled) {
				var res = JSON.parse(fulfilled);
				console.log("CHEATER!", res);

				App.WordModel.word = res.word;
				App.WordModel.initScrubbedWord();
				App.WordModel.lettersGuessed = [];
				App.Stats.setRemainingGuesses(App.WordModel.word.length);
				App.View.refreshElements();
			})
			.catch(function(error) {
				console.log(error);
				return error;
			});
	}

	function checkGameStatus() {
		if(App.WordModel.hasWon()) {
			win();
		} else if(!App.Stats.hasRemainingGuesses()) {
			lose();
		}
	}

	function win() {
		alert("you win");
	}

	function lost() {
		alert("you lose");
	}

}(HangmanApp || {}));
