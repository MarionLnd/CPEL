const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professorSchema  = new Schema({
    idProf : String,
    nomProf : String,
    prenomProf : String,
    emailProf: String,
    pwdProf: String,
    idModuleProf: String
})

module.exports = mongoose.model('professor', professorSchema);
