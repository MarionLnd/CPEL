const mongoose = require('mongoose');

const correction  = mongoose.Schema({
    idExercise : String,
    idCorrection : String,
<<<<<<< HEAD
    contenu : String
=======
    idExercise : String,
    content : String
>>>>>>> 0603121b8cc2c8db225790ad234a8b8c99bd3d78
})

module.exports = mongoose.model('correction', correction);
