const mongoose = require('mongoose');

const td  = mongoose.Schema({
    name : String,
    idModule : String,
    exercises : Array,
    dateLimit : Date,
})
module.exports = mongoose.model('td', td);
