const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idCorrection : String,
    idExercice : String,
    contenu : String
})

module.exports = mongoose.model('correction', correction);
