const mongoose = require('mongoose');

const wording  = mongoose.Schema({
    // idWording : String,
    idExercise : String,
    idCorrection : String,
    content: String,
})

module.exports = mongoose.model('wording', wording);
