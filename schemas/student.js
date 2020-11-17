const mongoose = require('mongoose');

const student  = mongoose.Schema({
    // idStudent: String,
    lastname: String,
    firstname: String,
    studentNumber : String,
    email: String,
    password: String,
    idGroup: String
})

module.exports = mongoose.model('student', student);


