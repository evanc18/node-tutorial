const config = require('config')
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');

//Debugger functions
const startupDebug = require('debug')('app:startup')
const dbDebug = require('debug')('app:db')

const app = express();

//PORT as ENV variable
const port = process.env.PORT || 3000

//Config
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))
console.log(`Node is ${process.env.NODE_ENV}`);
const env = app.get('env') //Same thing as above, but will return "development" by default if not set
app.set('view engine', 'pug');
app.set('views', './views')

//Middleware

app.use(express.json()); 
//app.use(express.urlencoded()) 
app.use(express.static('public'))
app.use(logger);
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses); //for any route that start with /api/courses use courses.js


if(env === 'development'){
    app.use(morgan('tiny'));
    startupDebug('Morgan enabled...');
}

//Db work
dbDebug('Connected to the database');

//Routing
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
})


app.listen(port, () => console.log(`Listening on port ${port}...`))



