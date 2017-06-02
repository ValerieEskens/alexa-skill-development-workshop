const WELCOME_MESSAGE = 'Yow CG';


module.exports.handlers = {
    LaunchRequest() {
        this.emit(':tell', WELCOME_MESSAGE);
    }
};
