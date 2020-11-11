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
router.post("/exercise/:idModule",async (req,res)=>{
  let newExercise = new  exercise(req.body);
  newExercise.idModule = req.params.idModule;
  await newExercise.save().then((result)=>{
    res.status(200).json({ NewExercise : "201 => localhost:3000/api/exercise/"+newExercise._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout de la correction d’un exercice
router.post("/correction/:idExercise",async (req,res)=>{
  let newCorrection = new  correction(req.body);
  newCorrection.idExercise = req.params.idExercise;
  await newCorrection.save().then((result)=>{
    res.status(200).json({ NewCorrection : "201 => localhost:3000/api/student/"+newCorrection._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// Ajout du rendu d'un étudiant
router.post("/studentRendering/:idStudent/:idExercise",async (req,res)=>{
  let newStudentRendering = new  studentRendering(req.body);
  newStudentRendering.idExercise = req.params.idExercise;
  newStudentRendering.idStudent = req.params.idStudent;
  await newStudentRendering.save().then((result)=>{
    res.status(200).json({ NewRendering : "201 => localhost:3000/api/studentRendering/"+newStudentRendering._id})
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
router.route('/professor/:idProfessor').get(function async(req,res){
      professor.findById(req.params.idProfessor, function(err, professor) {
        if (err)
          res.send(err);
        res.json(professor);
      });
    });

// Récupère tous les étudiants
router.get("/student",async (req,res)=>{
  await student.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère les étudiants par ID
router.route('/student/:idStudent').get(function async(req,res){
      student.findById(req.params.idStudent, function(err, student) {
        if (err)
          res.send(err);
        res.json(student);
      });
    });

// Récupère les groupes
router.get("/group",async (req,res)=>{
  await group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère un groupe
router.route('/group/:idGroup').get(function async(req,res){
  group.findById(req.params.idGroup, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
});

// Recup tous les modules
router.get("/module",async (req,res)=>{
  await mod.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Recup tous les modules d'un prof
/*router.route('/module/:idProfessor').get(function async(req,res){
  mod.findById(req.params.idProfessor, function(err, mod) {
    if (err)
      res.send(err);
    res.json(mod);
  });
});*/

// Recupérer un module
router.route('/module/:idModule').get(function async(req,res){
  mod.findById(req.params.idModule, function(err, mod) {
    if (err)
      res.send(err);
    res.json(mod);
  });
});

// Récupérer tous les exercices
router.get("/exercise",async (req,res)=>{
  await exercise.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupérer un exercice
router.route('/exercise/:idExercise').get(function async(req,res){
  exercise.findById(req.params.idExercise, function(err, exercise) {
    if (err)
      res.send(err);
    res.json(exercise);
  });
});

// Récupère tous les rendus de tous les étudiants
router.get("/studentRendering",async (req,res)=>{
  await studentRendering.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupérer tous les rendus pour un étudiant
router.route('/studentRendering/:idStudent').get(function async(req,res){
  studentRendering.findById(req.params.idStudent, function(err, studentRendering) {
    if (err)
      res.send(err);
    res.json(studentRendering);
  });
});

// Récupérer les rendus d'un exercice pour un étudiant
router.get("/studentRendering/:idExercise/:idStudent", async (req, res) => {
  try {
    const exo = await studentRendering.findOne({ idExercise: req.params.idExercise, idStudent: req.params.idStudent })
    res.send(exo)
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

// Récupérer toutes les corrections
router.get("/correction",async (req,res)=>{
  await correction.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupérer Correction par ID
router.route('/correction/:idCorrection').get(function async(req,res){
  correction.findById(req.params.idCorrection, function(err, correction) {
    if (err)
      res.send(err);
    res.json(correction);
  });
});

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

// -----------------------------------------------
//                  [ DELETE ]
// -----------------------------------------------

// Suppression d'un prof
router.delete("/professor/:id", async (req, res) => {
  try {
    await group.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

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

module.exports = router;

