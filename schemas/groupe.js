const mongoose = require('mongoose');

const groupe  = mongoose.Schema({
    idGroupe : String,
    nomGroupe : String,
    nbreEtudiants : Number
})
