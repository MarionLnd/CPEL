const mongoose = require('mongoose');

const student  = mongoose.Schema({
    idStudent: String,
    nomStudent: String,
    prenomStudent: String,
    emailStudent: String,
    pwdStudent: String,
    idModuleStudent: String,
    idGroupe: String,
})

module.exports = mongoose.model('student', student);


