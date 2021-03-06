const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professorSchema  = new Schema({
    lastname : String,
    firstname : String,
    professorNumber : String,
    email: String,
    idModule: String
})

module.exports = mongoose.model('professor', professorSchema);
