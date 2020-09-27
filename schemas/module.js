const mongoose = require('mongoose');

const mod  = mongoose.Schema({
    idmodule : String,
    nom : String,
    contenu : String
})
module.exports = mongoose.model('module', mod);
