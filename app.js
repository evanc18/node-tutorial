const Logger = require('./logger')
const path = require('path');
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');
const http = require('http')

//Module exporting and requires
console.log(Logger);
//log("Hello world!")

//Path module
var pathObj = path.parse(__filename);
console.log(pathObj)

//Os module and template strings
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//File system module with sync vs async functionality
var files = fs.readdirSync('./');
console.log(files)
fs.readdir('./', function(err, files) {
    if (err) console.log('Error ', err);
    else console.log('Result ', files)  
});

//Event emitter with arrow notation
const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
}); //Register listener

logger.log('message'); //Listener and emit need same logger!!

//HTTP Module
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write('Hello World');
        res.end();
    }
    if (req.url == '/api/courses') {
        res.write(JSON.stringify([1,2,3,4]))
        res.end();
    }
});
server.listen(3000);
console.log('Listening on port 3000...');








