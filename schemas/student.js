const mongoose = require('mongoose');

const student  = mongoose.Schema({
    lastname: String,
    firstname: String,
    studentNumber : String,
    email: String,
    idGroup: String
})

module.exports = mongoose.model('student', student);


