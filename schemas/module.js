const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    // idmodule : String,
    name : String,
    content : String,
    groups : Array,
    idProfessor : String,
    createdAt : Date
})
module.exports = mongoose.model('module', mod);
