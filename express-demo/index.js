const config = require('config')
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

//PORT as ENV variable
const port = process.env.PORT || 3000


//Config
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))
console.log(`Node is ${process.env.NODE_ENV}`);
const env = app.get('env') //Same thing as above, but will return "development" by default if not set

//Middleware
app.use(express.json()); 
//app.use(express.urlencoded()) 
app.use(express.static('public'))
app.use(logger);
app.use(helmet());

if(env === 'development'){
    app.use(morgan('tiny'));
    console.log("Morgan enabled...")
}
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
})



const courses = [
    {id: 1, name: 'math'},
    {id: 2, name: 'english'},
    {id: 3, name: 'science'}
];


app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

/**
 * CRUD OPERATIONS
 */

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required()
    });

    return schema.validate(course);
}

//Get request, matching a route parameter
app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params)
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given id was not found');

    res.send(course);
});

//Post request, by convention send the body with new id back with Joi input validation
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); 
    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
});

//Put (update) request
app.put('/api/courses/:id', (req, res) => {
    //Look up course if not 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    
    //Validate if not 400 
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); //Object destruction
    if (error) return res.status(400).send(error.details[0].message);

    //Update and return
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    //Look up course if not 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given id was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same object 
    res.send(course)
})



app.listen(port, () => console.log(`Listening on port ${port}...`))



