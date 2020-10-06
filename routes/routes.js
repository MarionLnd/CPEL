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
const wording = require('../schemas/wording');


// -------------------------------------------
//                  [ POST ]
// -------------------------------------------

// Ajout professeur : supprimer addProfessor code retour 201/location/professor/numeroId
// Supprimer les verbes

router.post("/professor",async (req,res)=>{
  let newProfessor = new professor(req.body);
  await newProfessor.save().then((result)=>{
    res.status(200).json({ NewProfessor : "201 => localhost:3000/api/professor/"+newProfessor._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout étudiant
router.post("/student",async (req,res)=>{
  let newStudent = new  student(req.body);
  await newStudent.save().then((result)=>{
    res.status(200).json({ NewStudent : "201 => localhost:3000/api/student/"+newStudent._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un groupe étudiant
router.post("/group",async (req,res)=>{
  let newGroup = new  group(req.body);
  await newGroup.save().then((result)=>{
    res.status(200).json({ NewGroup : "201 => localhost:3000/api/group/"+newGroup._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d'un module
router.post("/module",async (req,res)=>{
  let newModule = new mod(req.body);
  await newModule.save().then((result)=>{
    res.status(200).json({ NewModule : "201 => localhost:3000/api/module/"+newModule._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d’un exercice par module
router.post("/exercise/:id",async (req,res)=>{
  let newExercise = new  exercise(req.body);
  newExercise.idModule = req.params.id;
  await newExercise.save().then((result)=>{
    res.status(200).json({ NewExercise : "201 => localhost:3000/api/exercise/"+newExercise._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout de la correction d’un exercice
router.post("/correction/:id",async (req,res)=>{
  let newCorrection = new  correction(req.body);
  newCorrection.idExercise = req.params.id;
  await newCorrection.save().then((result)=>{
    res.status(200).json({ NewCorrection : "201 => localhost:3000/api/student/"+newCorrection._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout du rendu d'un étudiant
router.post("/studentRendering/:id/:idStudent",async (req,res)=>{
  let newStudentRendering = new  studentRendering(req.body);
  newStudentRendering.idExercise = req.params.id;
  newStudentRendering.idStudent = req.params.idStudent;
  await newStudentRendering.save().then((result)=>{
    res.status(200).json({ NewRendering : "201 => localhost:3000/api/studentRendering/"+newStudentRendering._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout d'un énoncé
router.post("/wording/:id",async (req,res)=>{
  let newWording = new  wording(req.body);
  newWording.idExercise = req.params.id;
  await newWording.save().then((result)=>{
    res.status(200).json({ NewWording : "201 => localhost:3000/api/wording/"+newWording._id})
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

// Recup tous les modules
router.get("/module",async (req,res)=>{
  await mod.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

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

// Recupere un énoncé
router.get("/wording/:id", async (req, res) => {
  try {
    const exo = await wording.findOne({ idWording: req.params.id })
    res.send(exo)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Recupere tous les enoncés d'un exercice
router.get("/wording/:id", async (req, res) => {
  try {
    const exo = await wording.findOne({ idExercise: req.params.id })
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
router.put("/student/:id", async (req, res) => {
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
router.put("/exercise/:id", async (req, res) => {
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
router.put("/correction/:id", async (req, res) => {
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
router.put("/studentRendering/:id/:idExercise", async (req, res) => {
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

// Update Enoncé
router.put("/wording/:id", async (req, res) => {
  try {
    const wording = await wording.findOne({ idWording: req.params.id })
    if (req.body.content) {
      wording.content = wording.body.content
    }
    await wording.save()
    res.send(wording)
  } catch {
    res.status(404)
    res.send({ error: "404 " })
  }
})

// -----------------------------------------------
//                  [ DELETE ]
// -----------------------------------------------

// Suppression d'un groupe
router.delete("/group/:id", async (req, res) => {
  try {
    await group.deleteOne({ idGroup: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Suppression d'un exercice
router.delete("/exercise/:id", async (req, res) => {
  try {
    await exercise.deleteOne({ idExercise: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Supression d'un rendu
router.delete("/studentRendering/:id", async (req, res) => {
  try {
    await studentRendering.deleteOne({ idExercise: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Supression d'un énoncé
router.delete("/wording/:id", async (req, res) => {
  try {
    await wording.deleteOne({ idWording: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

module.exports = router;
