const TEST = "Why don't you come on over Valerie";
const WELCOME_MESSAGE = 'Welcome to High Low guessing game. You have played 0 times. Would you like to play?';
const START_GAME = 'Great! Try saying'


module.exports.handlers = {
    LaunchRequest() {
        this.emit(':tell', TEST);
    }
};
