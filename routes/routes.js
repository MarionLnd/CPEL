// ------------------------------------------
//                [ DECLA ]
// ------------------------------------------

var express = require('express');
var router = express.Router();
const professor = require('../schemas/professor.js');
const student = require('../schemas/student');
const group = require('../schemas/group');
const exercise = require('../schemas/exercise');
const mod = require('../schemas/module');
const correction = require('../schemas/correction');
const studentRendering = require('../schemas/studentRendering');

// -------------------------------------------
//                  [ POST ]
// -------------------------------------------

// Ajout professeur
router.post("/professor/addProfessor",async (req,res)=>{
  let newProfessor = new professor(req.body);
  await newProfessor.save().then((result)=>{
    res.status(200).json({result : result, professor : newProfessor})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout étudiant
router.post("/student/addStudent",async (req,res)=>{
  let newStudent = new  student(req.body);
  await newStudent.save().then((result)=>{
    res.status(200).json({result : result, student : newStudent})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un groupe étudiant
router.post("/group/addGroup",async (req,res)=>{
  let newGroup = new  group(req.body);
  await newGroup.save().then((result)=>{
    res.status(200).json({result : result, group : newGroup})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d'un module
router.post("/module/addModule",async (req,res)=>{
  let newModule = new mod(req.body);
  await newModule.save().then((result)=>{
    res.status(200).json({result : result, module : newModule})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un exercice par module
router.post("/exercise/addExercise/:id",async (req,res)=>{
  let newExercise = new  exercise(req.body);
  newExercise.idModule = req.params.id;
  await newExercise.save().then((result)=>{
    res.status(200).json({result : result, exercise : newExercise})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout de la correction d’un exercice
router.post("/correction/addCorrection/:id",async (req,res)=>{
  let newCorrection = new  correction(req.body);
  newCorrection.idExercise = req.params.id;
  await newCorrection.save().then((result)=>{
    res.status(200).json({result : result, correction : newCorrection})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout du rendu d'un étudiant
router.post("/studentRendering/addStudentRendering/:id/:idStudent",async (req,res)=>{
  let newStudentRendering = new  studentRendering(req.body);
  newStudentRendering.idExercise = req.params.id;
  newStudentRendering.idStudent = req.params.idStudent;
  await newStudentRendering.save().then((result)=>{
    res.status(200).json({result : result, studentRendering : newStudentRendering})
  },(err)=>{
    res.status(400).json(err)
  })
});


// -----------------------------------------------
//                    [ GET ]
// -----------------------------------------------

// Récupère tous les professeurs
router.get("/professor",async (req,res)=>{
  await professor.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère toutes les informations d’un professeur en fonction de son id
router.get("/professor/:id", async (req, res) => {
  try {
    const prof = await professor.findOne({ idProfessor: req.params.id })
    res.send(prof)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupère tous les étudiants
router.get("/student",async (req,res)=>{
  await student.find({}).then((result)=>{
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
router.get("/group",async (req,res)=>{
  await group.find({}).then((result)=>{
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
router.get("/exercise",async (req,res)=>{
  await group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupérer un exercice
router.get("/exercise/:id", async (req, res) => {
  try {
    const exo = await exercise.findOne({ idExercise: req.params.id })
    res.send(exo)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupérer tous les rendus pour un étudiant
router.get("/studentRendering/:id", async (req, res) => {
  try {
    const exo = await studentRendering.findOne({ idStudent: req.params.id })
    res.send(exo)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupérer les rendus d'un exercice pour un étudiant
router.get("/studentRendering/:id/:idStudent", async (req, res) => {
  try {
    const exo = await exercise.studentRendering({ idExercise: req.params.id, idStudent: req.params.idStudent })
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
    if (req.body.idGroup) {
      etu.idGroup = req.body.idGroup
    }
    await etu.save()
    res.send(etu)
  } catch {
    res.status(404)
    res.send({ error: "404 " })
  }
})

// Update Exercice
router.put("/exercise/updateExercise/:id", async (req, res) => {
  try {
    const exo = await exercise.findOne({ idExercise: req.params.id })
    if (req.body.wording) {
      exo.wording = req.body.wording
    }
    await exo.save()
    res.send(exo)
  } catch {
    res.status(404)
    res.send({ error: "404 " })
  }
})

// Update Correction
router.put("/correction/updateCorrection/:id", async (req, res) => {
  try {
    const correct = await correction.findOne({ idCorrection: req.params.id })
    if (req.body.content) {
      correct.content = correct.body.content
    }
    await correct.save()
    res.send(correct)
  } catch {
    res.status(404)
    res.send({ error: "404 " })
  }
})

// Update Rendu
router.put("/studentRendering/updateStudentRendering/:id/:idExercise", async (req, res) => {
  try {
    const correct = await studentRendering.findOne({ idStudent: req.params.id, idExercise: req.params.idExercise })
    if (req.body.content) {
      correct.content = correct.body.content
    }
    await correct.save()
    res.send(correct)
  } catch {
    res.status(404)
    res.send({ error: "404 " })
  }
})

// -----------------------------------------------
//                  [ DELETE ]
// -----------------------------------------------

// Suppression d'un groupe
router.delete("/group/deleteGroup/:id", async (req, res) => {
  try {
    await group.deleteOne({ idGroup: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Suppression d'un exercice
router.delete("/exercise/deleteExercise/:id", async (req, res) => {
  try {
    await exercise.deleteOne({ idExercise: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Supression d'un rendu
router.delete("/studentRendering/deleteStudentRendering/:id", async (req, res) => {
  try {
    await studentRendering.deleteOne({ idExercise: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

module.exports = router;
