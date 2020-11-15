const mongoose = require('mongoose');

const td  = mongoose.Schema({
    name : String,
    idModule : String,
    Exercises : Array,
    dateLimit : Date,
})
module.exports = mongoose.model('td', td);
