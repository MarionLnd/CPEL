const mongoose = require('mongoose');

const user  = mongoose.Schema({
    username :
        {
            type: String,
            required: true,
            maxlength: 100
        },
    password : {
        type:String,
        required: true,
        minlength:8
    },
    type : {
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', user);
