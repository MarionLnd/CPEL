const mongoose = require('mongoose');

const module  = mongoose.Schema({
    idmodule : String,
    nom : String,
    contenu : String
})

module.exports = mongoose.model('module', module);
