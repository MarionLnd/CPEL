const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    name : String,
    content : String,
    groups : Array,
    idProfessor : String,
    nbExercises : Number,
    createdAt: {type: Date, default: Date.now}
})
module.exports = mongoose.model('module', mod);
