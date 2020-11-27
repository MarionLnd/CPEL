const mongoose = require('mongoose');

const td  = mongoose.Schema({
    name : String,
    idModule : String,
    exercises : Array,
    dateLimit : Date,
    createdAt: {type: Date, default: Date.now}
})
module.exports = mongoose.model('td', td);
