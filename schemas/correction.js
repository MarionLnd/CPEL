const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idExercise : String,
    idCorrection : String,
    idWording : String,
    content : String  
})

module.exports = mongoose.model('correction', correction);
