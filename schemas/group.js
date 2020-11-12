const mongoose = require('mongoose');

const group  = mongoose.Schema({
    // idGroup : String,
    name : String,
    nbOfStudents : Number,
    modules: Array,
    students: Array,
})

module.exports = mongoose.model('group', group);

