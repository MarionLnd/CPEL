const mongoose = require('mongoose');

const user  = mongoose.Schema({
    username : String,
    password : String,
    type : String,
    
})
module.exports = mongoose.model('user', user);
