const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    try{
        const course = new Course({
            name: 'Angular.js',
            author: 'Evan',
            tages: ['angular', 'frontend'],
            isPublished: true
        });
        const result = await course.save();
        console.log(result);
    } catch(err) {
        console.error(err)
    }
};

async function getCourse(){
    try{
        const courses = await Course
            .find({author:'Evan', isPublished:true})
            .limit(10)
            .sort({ name: 1 })
            .select({ name: 1, tags: 1 })
        console.log(courses)
    } catch(err) {
        console.error(err)
    }
};

//createCourse();
getCourse();

