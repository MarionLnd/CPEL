const mongoose = require('mongoose');

const studentRendering  = mongoose.Schema({
    idStudent : String,
    idExercise : String,
    createdAt: {type: Date, default: Date.now},
    content : String
})

module.exports = mongoose.model('studentRendering', studentRendering);
