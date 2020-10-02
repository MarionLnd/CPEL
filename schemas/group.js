const mongoose = require('mongoose');

const group  = mongoose.Schema({
    idGroup : String,
    name : String,
    nbOfStudents : Number
})

module.exports = mongoose.model('group', group);

