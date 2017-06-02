const Alexa = require('alexa-sdk');

const WELCOME_MESSAGE = 'Welcome to High Low guessing game. You have played 0 times. Would you like to play?';
const START_GAME = 'Great! Try saying a number to start the game.';
const TOO_LOW = 'is too low';
const TOO_HIGH = 'is too high';
const CORRECT = 'is correct! Would you like to play a new game?';
const NEW_GAME = 'Great! Try saying a number to start the game.';
const STOP_GAME = 'Ok, see you next time!';

const states = {
    START: '_START',
    GUESSINGGAME: '_GUESSINGGAME'
};

let guess = 0;

module.exports.handlers = {
    LaunchRequest() {
        this.handler.state = states.START;
        this.emitWithState('Start');
    }
};

module.exports.startHandlers = Alexa.CreateStateHandler(states.START, {
   Start() {
       this.emit(':ask', WELCOME_MESSAGE);
   },
   'AMAZON.YesIntent': function () {
       this.handler.state = states.GUESSINGGAME;
       this.emitWithState('Start');
   },
   Unhandled() {
       this.emitWithState('Start');
   }
});

module.exports.gameHandlers = Alexa.CreateStateHandler(states.GUESSINGGAME, {
    Start() {
        this.attributes.numberToGuess = parseInt(Math.floor((Math.random() * 100) + 1), 10);
        console.log('number to guess:', this.attributes.numberToGuess);
        this.emit(':ask', START_GAME);
    },
    NumberGuessIntent() {
        guess = this.event.request.intent.slots.number.value;
        console.log('NumberGuessIntent jow', this.attributes.numberToGuess);
        if (guess !== undefined) {
            if (guess < this.attributes.numberToGuess) {
                this.emit(':ask', TOO_LOW);
            } else if (guess > this.attributes.numberToGuess) {
                this.emit(':ask', TOO_HIGH);
            } else if (guess === this.attributes.numberToGuess) {
                this.emit(':ask', CORRECT);
            } else {
                this.emit(':tell', 'kapotski');
            }
        }
    },
    Unhandled() {
        this.emit(':tell', 'I\'m broken');
        // this.handler.state = states.START;
        // this.emitWithState('Start');
    }
});