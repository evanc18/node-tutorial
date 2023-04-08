const express = require('express');
const Joi = require('joi')

const app = express();
app.use(express.json()); //Middleware


//PORT as ENV variable
const port = process.env.PORT || 3000

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



