const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idExercise : String,
    correctionCode : String,
    content : String  
})

module.exports = mongoose.model('correction', correction);
