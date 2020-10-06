const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    idmodule : String,
    name : String,
    content : String,
    groups : Array
})
module.exports = mongoose.model('module', mod);
