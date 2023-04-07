
console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';

const EventEmitter = require('events')

class Logger extends EventEmitter{
    log(message) {
        //Send an HTPP request
        console.log(message);
        //Raise event
        this.emit('messageLogged', { id: 1, url: 'http://' }); 
    }
    
}

module.exports = Logger;