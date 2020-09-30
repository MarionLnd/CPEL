const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idCorrection : String,
    idExercise : String,
    content : String
})

module.exports = mongoose.model('correction', correction);
