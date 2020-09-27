// ------------------------------------------
//                [ DECLA ]
// ------------------------------------------

var express = require('express');
var router = express.Router();
const professor = require('../schemas/professor.js');
const student = require('../schemas/student');
const group = require('../schemas/groupe');
const exercise = require('../schemas/exercice');
const mod = require('../schemas/module');

// -------------------------------------------
//                  [ POST ]
// -------------------------------------------

// Ajout professeur
router.post("/professor/addProfessor",(req,res)=>{
  let newProfessor = new  professor(req.body);
  newProfessor.save().then((result)=>{
    res.status(200).json({result : result, professor : newProfessor})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout étudiant
router.post("/student/addStudent",(req,res)=>{
  let newStudent = new  student(req.body);
  newStudent.save().then((result)=>{
    res.status(200).json({result : result, student : newStudent})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un groupe étudiant
router.post("/group/addGroup",(req,res)=>{
  let newGroup = new  group(req.body);
  newGroup.save().then((result)=>{
    res.status(200).json({result : result, group : newGroup})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d'un module
router.post("/module/addModule",(req,res)=>{
  let newModule = new mod(req.body);
  newModule.save().then((result)=>{
    res.status(200).json({result : result, module : newModule})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un exercice par module
router.post("/exercise/addExercise",(req,res)=>{
  let newExercise = new  exercise(req.body);
  newExercise.save().then((result)=>{
    res.status(200).json({result : result, exercise : newExercise})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout de la correction d’un exercice
router.post("/correction/addCorrection",(req,res)=>{
  let newCorrection = new  exercise(req.body);
  newCorrection.save().then((result)=>{
    res.status(200).json({result : result, correction : newCorrection})
  },(err)=>{
    res.status(400).json(err)
  })
});

// -----------------------------------------------
//                    [ GET ]
// -----------------------------------------------

// Récupère tous les professeurs
router.get("/professor",(req,res)=>{
  professor.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère toutes les informations d’un professeur en fonction de son id
router.get("/professor/:id", async (req, res) => {
  try {
    const prof = await professor.findOne({ idProf: req.params.id })
    res.send(prof)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupère le nom, prénom, mot de passe et email

// Récupère tous les étudiants
router.get("/student",(req,res)=>{
  student.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère les étudiants par ID
router.get("/student/:id", async (req, res) => {
  try {
    const etu = await student.findOne({ idStudent: req.params.id })
    res.send(etu)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupère les groupes
router.get("/group",(req,res)=>{
  group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère un groupe
router.get("/group/:id", async (req, res) => {
  try {
    const grp = await group.findOne({ idGroup: req.params.id })
    res.send(grp)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupérer tous les exercices
router.get("/exercise",(req,res)=>{
  group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupérer un exercice
router.get("/exercise/:id", async (req, res) => {
  try {
    const exo = await exercise.findOne({ idExercice: req.params.id })
    res.send(exo)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// -----------------------------------------------
//                  [ UPDATE ]
// -----------------------------------------------

// MAJ du groupe d'un étudiant
router.put("/student/updateStudentGroup/:id", async (req, res) => {
  try {
    const etu = await student.findOne({ idStudent: req.params.id })
    if (req.body.idGroupe) {
      etu.idGroupe = req.body.idGroupe
    }
    await etu.save()
    res.send(etu)
  } catch {
    res.status(404)
    res.send({ error: "404 " })
  }
})

module.exports = router;
