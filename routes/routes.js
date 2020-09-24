var express = require('express');
var router = express.Router();
const professor = require('../schemas/professor.js');
const student = require('../schemas/student');
const group = require('../schemas/groupe');

// --------------
// POST
// --------------

// Ajout professeur
router.post("/api/professor/addProfessor",(req,res)=>{
  let newProfessor = new  professor(req.body);
  newProfessor.save().then((result)=>{
    res.status(200).json({result : result, professor : newProfessor})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout étudiant
router.post("/api/student/addStudent",(req,res)=>{
  let newStudent = new  student(req.body);
  newStudent.save().then((result)=>{
    res.status(200).json({result : result, student : newStudent})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un groupe étudiant
router.post("/api/group/addGroup",(req,res)=>{
  let newGroup = new  group(req.body);
  newGroup.save().then((result)=>{
    res.status(200).json({result : result, group : newGroup})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un exercice par module

// Ajout d’un étudiant dans un groupe

// Ajout de la correction d’un exercice

// -----------------
// GET
// -----------------


// Récupère tous les professeurs
router.get("/api/professor",(req,res)=>{
  professor.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});


// Récupère toutes les informations d’un professeur en fonction de son id

router.get("/api/professor/:idProf",(req,res)=>{
  professor.find({idProf : req.params.idProf}).then((result)=>{
    res.status(200).json({message : "Personne trouvé"})
    res.status(200).json(result);
  },(err)=>{
    res.status(400).json(err)
  })
});

module.exports = router;
