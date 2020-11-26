const mongoose = require('mongoose');

const group  = mongoose.Schema({
    name : String,
    modules: Array,
    students: Array,
})

module.exports = mongoose.model('group', group);

