const WELCOME_MESSAGE = 'Hello Valerie!';

module.exports.handlers = {
    LaunchRequest() {
        this.emit(':tell', WELCOME_MESSAGE);
    }
};
