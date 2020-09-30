const mongoose = require('mongoose');

const studentRendering  = mongoose.Schema({
    idStudent : String,
    idExercise : String,
    content : String,
    exerciseDone: Boolean,
})

module.exports = mongoose.model('studentRendering', studentRendering);
