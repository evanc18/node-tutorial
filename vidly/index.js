
const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json()); //Middleware

//PORT as ENV variable
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

schema = Joi.object({
    name: Joi.string()
        .min(1)
        .required()
});

function validateGenre(genre){
    return schema.validate(genre)
};


const genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Adventure"},
    {id: 3, name: "Mystery"},
    {id: 4, name: "Comedy"}
];

app.get('/api/genres', (req, res) => {
    if(!genres) return res.status(404).send('No genres found')
    res.send(genres)
});

//CRUD

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Genre not found!");
    res.send(genre)
});

app.post('/api/genres/', (req, res) => {
    //Validate
    const { err } = validateGenre(req.body);
    if (err) return res.status(400).send(error.details[0].message)

    //Post
    console.log(req.body)
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre)
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Genre not found!");

    //Validate
    const { err } = validateGenre(req.body);
    if (err) return res.status(400).send(error.details[0].message)

    //Update
    genre.name = req.body.name
    res.send(genre)
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Genre not found!");

    //Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});