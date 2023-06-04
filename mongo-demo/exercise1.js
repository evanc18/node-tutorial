const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/courses')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    tags: [],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    Course
        .sort({name: 1})
        .select({})
}