const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idExercise : String,
    idCorrection : String,
    contenu : String
})

module.exports = mongoose.model('correction', correction);
