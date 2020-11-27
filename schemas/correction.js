const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idExercise : String,
    correctionCode : String,
    content : String,
    sendCorrection : Boolean,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('correction', correction);
