const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    // idmodule : String,
    name : String,
    content : String,
    groups : Array,
    idProfessor : String,
    createdAt: {type: Date, default: Date.now},
})
module.exports = mongoose.model('module', mod);
