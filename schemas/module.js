const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    // idmodule : String,
    name : String,
    content : Object,
    groups : Array,
    idProfessor : String,
    createdAt: {type: Date, default: Date.now},
    nbExercises : Number
})
module.exports = mongoose.model('module', mod);
