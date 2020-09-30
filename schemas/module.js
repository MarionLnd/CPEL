const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    idmodule : String,
    name : String,
    content : String
})
module.exports = mongoose.model('module', mod);
