const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idExercise : String,
    correctionCode : String,
    content : String,
    sendCorrection : Boolean
})

module.exports = mongoose.model('correction', correction);
