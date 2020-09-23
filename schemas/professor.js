const mongoose = require('mongoose');

const professor  = mongoose.Schema({
    idProf : String,
    nomProf : String,
    prenomProf : String,
    emailProf: String,
    pwdProf: String,
    idModuleProf: String
})
