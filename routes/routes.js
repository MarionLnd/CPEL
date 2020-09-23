var express = require('express');
var router = express.Router();
const professor = require('../schemas/professor.js');

router.post("/api/professor/addNewProfessor",(req,res)=>{
  let newProfessor = new  professor(req.body);
  newProfessor.save().then((result)=>{
    res.status(200).json({result : result, professor : newProfessor})
  },(err)=>{
    res.status(400).json(err)
  })
});

module.exports = router;
