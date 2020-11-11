const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professorSchema  = new Schema({
    idProfessor : String,
    lastname : String,
    firstname : String,
    email: String,
    password: String,
    idModule: String
})

module.exports = mongoose.model('professor', professorSchema);
