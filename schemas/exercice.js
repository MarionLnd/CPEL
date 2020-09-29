const mongoose = require('mongoose');

const exercice  = mongoose.Schema({
    idExercice: String,
    nom : String,
    idModule : String,
    enonce: String,
    criteresSyntaxes: String,
    criteresLogiques: String
})

module.exports = mongoose.model('exercice', exercice);

