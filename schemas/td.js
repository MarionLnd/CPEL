const mongoose = require('mongoose');

const td  = mongoose.Schema({
    name : String,
    idModule : String,
    Exercises : Array,

})
module.exports = mongoose.model('td', td);
