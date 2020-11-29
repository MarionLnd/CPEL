const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    name : String,
    content: String,
    groups : Array,
    idProfessor : String,
    tds : Array,
    createdAt: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('module', mod);
