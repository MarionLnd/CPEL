const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idCorrection : String,
    idExercice : String,
    contenu : String
})
