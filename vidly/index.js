
const express = require('express')
const Joi = require('joi')
const genres = require('./routes/genres')

const app = express()
app.use(express.json()); //Middleware

//PORT as ENV variable
const port = process.env.PORT || 3000;

//Routing
app.use('/api/genres', genres)

app.listen(port, () => console.log(`Listening on port ${port}...`));

