const mongoose = require('mongoose');

const exercice  = mongoose.Schema({
    idExercie: String,
    nom : String,
    idModule : String,
})

module.exports = mongoose.model('exercice', exercice);

