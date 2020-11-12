const mongoose = require('mongoose');

const exercise  = mongoose.Schema({
    name : String,
    idTD : String,
    wording: String,
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('exercise', exercise);

