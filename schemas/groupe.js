const mongoose = require('mongoose');

const groupe  = mongoose.Schema({
    idGroupe : String,
    nomGroupe : String,
    nbreEtudiants : Number
})

module.exports = mongoose.model('groupe', groupe);

