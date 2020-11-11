const mongoose = require('mongoose');

const studentRendering  = mongoose.Schema({
    idStudent : String,
    idExercise : String,
    createdAt : Date,
    content : String,
    exerciseDone: Boolean,
    comment : String
})

module.exports = mongoose.model('studentRendering', studentRendering);
