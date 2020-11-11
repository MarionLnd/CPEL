const mongoose = require('mongoose');

const exercise  = mongoose.Schema({
    //idExercise: String,
    name : String,
    idModule : String,
    wording: String,
    syntaxCriteria: String,
    logicCriteria: String
})

module.exports = mongoose.model('exercise', exercise);

