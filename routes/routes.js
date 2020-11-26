// ------------------------------------------
//                [ DECLA ]
// ------------------------------------------

const express = require('express');
const router = express.Router();
const professor = require('../schemas/professor.js');
const student = require('../schemas/student');
const group = require('../schemas/group');
const exercise = require('../schemas/exercise');
const mod = require('../schemas/module');
const correction = require('../schemas/correction');
const studentRendering = require('../schemas/studentRendering');
const td = require('../schemas/td');
const user = require('../schemas/user');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

// -------------------------------------------
//                  [ POST ]
// -------------------------------------------

/**
 * Post user url
 * @route POST /user
 * @group user - Operations about user
 * @returns {object} 201 - A new user
 * @returns {Error}  default - Unexpected error
 */
router.post("/user",async (req,res)=>{
    const isUsernameExist = await user.findOne({ username: req.body.username });
    const isProfessorExist = await professor.findOne({ professorNumber: req.body.username });
    const isStudentExist = await student.findOne({ studentNumber: req.body.username });
    if ( isProfessorExist === null && req.body.type === "professor"){
        return res.status(400).json({ error: "Can't sign up" });
    }
    else if ( isStudentExist === null && req.body.type === "student"){
      return res.status(400).json({ error: "Can't sign up" });
    }
    else if(isUsernameExist) {
      return res.status(400).json({ error: "Email already exists" });
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        let newUser = new user(req.body);
        newUser.password = password;
        await newUser.save().then((result)=>{
          res.status(201).json({ NewUser : "201 => localhost:3000/api/professor/"+newUser._id})
        },(err)=>{
          res.status(400).json(err)
        })
      }
});

/**
 * Get user url
 * @route GET /user
 * @group user - Operations about user
 * @returns {object} 200 - User
 * @returns {Error}  404 - User Not found
 */
// Connexion d'un user
router.get("/login", async (req, res) => {
    const userLogin = await user.findOne({ username: req.body.username });
    if (!userLogin) return res.status(401).json({ error: "Username is wrong" });
    const validPassword = await bcrypt.compare(req.body.password, userLogin.password);
    if (!validPassword) return res.status(401).json({ error: "Password is wrong" });
    res.json({
        error: null,
        data: {
            message: "Login successful",
        },
    });
});

/**
 * Post professor url
 * @route POST /professor
 * @group professor - Operations about professor
 * @returns {object} 201 - A new professor
 * @returns {Error}  default - Unexpected error
 */
// Ajout un professeur
router.post("/professor",async (req,res)=>{
  let newProfessor = new professor(req.body);
  await newProfessor.save().then((result)=>{
    res.status(201).json({ NewProfessor : "201 => localhost:3000/api/professor/"+newProfessor._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post student url
 * @route POST /student
 * @group student - Operations about student
 * @returns {object} 201 - A new student
 * @returns {Error}  default - Unexpected error
 */
// Ajout étudiant
router.post("/student",async (req,res)=>{
  let newStudent = new  student(req.body);
  await newStudent.save().then((result)=>{
    res.status(201).json({ NewStudent : "201 => localhost:3000/api/student/"+newStudent._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post group url
 * @route POST /group
 * @group group - Operations about group
 * @returns {object} 201 - A new group
 * @returns {Error}  default - Unexpected error
 */
// Ajout d’un groupe étudiant
router.post("/group",async (req,res)=>{
  let newGroup = new  group(req.body);
  await newGroup.save().then((result)=>{
    res.status(201).json({ NewGroup : "201 => localhost:3000/api/group/"+newGroup._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post module url
 * @route POST /module
 * @group module - Operations about module
 * @returns {object} 201 - A new module
 * @returns {Error}  default - Unexpected error
 */
// Ajout d'un module
router.post("/module",async (req,res)=>{
  let newModule = new mod(req.body);
  await newModule.save().then((result)=>{
    res.status(201).json({ NewModule : "201 => localhost:3000/api/module/"+newModule._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post exercise url
 * @route POST /exercise/{idModule}
 * @group exercise - Operations about exercise
 * @param {string} idModule.path.required - idModule
 * @returns {object} 201 - A new exercise
 * @returns {Error}  default - Unexpected error
 */
// Ajout d’un exercice par module
router.post("/exercise/:idModule",async (req,res)=>{
  let newExercise = new  exercise(req.body);
  newExercise.idModule = req.params.idModule;
  await newExercise.save().then((result)=>{
    res.status(201).json({ NewExercise : "201 => localhost:3000/api/exercise/"+newExercise._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post correction url
 * @route POST /correction/{idExercise}
 * @group correction - Operations about correction
 * @param {string} idExercise.path.required - idExercise
 * @returns {object} 201 - A new correction
 * @returns {Error}  default - Unexpected error
 */
// Ajout de la correction d’un exercice
router.post("/correction/:idExercise",async (req,res)=>{
  let newCorrection = new  correction(req.body);
  newCorrection.idExercise = req.params.idExercise;
  await newCorrection.save().then((result)=>{
    res.status(201).json({ NewCorrection : "201 => localhost:3000/api/student/"+newCorrection._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post studentRendering url
 * @route POST /studentRendering/{idStudent}/{idExercise}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idStudent.path.required - idStudent
 * @param {string} idExercise.path.required - idExercise
 * @returns {object} 201 - A new studentRendering
 * @returns {Error}  default - Unexpected error
 */
// Ajout du rendu d'un étudiant
router.post("/studentRendering/:idStudent/:idExercise",async (req,res)=>{
  let newStudentRendering = new  studentRendering(req.body);
  newStudentRendering.idExercise = req.params.idExercise;
  newStudentRendering.idStudent = req.params.idStudent;
  await newStudentRendering.save().then((result)=>{
    res.status(201).json({ NewRendering : "201 => localhost:3000/api/studentRendering/"+newStudentRendering._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Post td url
 * @route POST /td
 * @group td - Operations about td
 * @returns {object} 201 - A new td
 * @returns {Error}  default - Unexpected error
 */
// Ajout d'un TD
router.post("/td",async (req,res)=>{
  let newTD = new td(req.body);
  await newTD.save().then((result)=>{
    res.status(201).json({ NewTD : "201 => localhost:3000/api/td/"+newTD._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

// -----------------------------------------------
//                    [ GET ]
// -----------------------------------------------

/**
 * Get all user url
 * @route GET /user
 * @group user - Operations about user
 * @returns {object} 200 - All User
 * @returns {Error}  404 - User Not found
 */
// Récupère les users
router.get("/user",async (req,res)=>{
    await user.find({}).then((result)=>{
        res.status(200).json(result)
    },(err)=>{
        res.status(404).json(err)
    })
});

/**
 * Get a user url
 * @route GET /user/{idUser}
 * @group user - Operations about user
 * @param {string} idUser.path.required - idUser
 * @returns {object} 200 - A user
 * @returns {Error}  404 - User Not found
 */
// Récupère un user
router.route('/user/:idUser').get(function async(req,res){
    user.findById(req.params.idUser, function(err, user) {
        if (err)
            res.send(err);
        res.status(200).json(user)
        // res.json(professor);
    });
});

/**
 * Get all professor url
 * @route GET /professor
 * @group professor - Operations about professor
 * @returns {object} 200 - All professor
 * @returns {Error}  404 - Professor Not found
 */
// Récupère tous les professeurs
router.get("/professor",async (req,res)=>{
  await professor.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a professor url
 * @route GET /professor/{idProfessor}
 * @group professor - Operations about professor
 * @param {string} idProfessor.path.required - idProfessor
 * @returns {object} 200 - A professor
 * @returns {Error}  404 - Professor Not found
 */
// Récupère toutes les informations d’un professeur en fonction de son id
router.route('/professor/:idProfessor').get(function async(req,res){
      professor.findById(req.params.idProfessor, function(err, professor) {
        if (err)
          res.status(404).json(err);
        res.status(200).json(professor);
      });
    });

/**
 * Get all student url
 * @route GET /student
 * @group student - Operations about student
 * @returns {object} 200 - All student
 * @returns {Error}  404 - Student Not found
 */
// Récupère tous les étudiants
router.get("/student",async (req,res)=>{
  await student.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a student url
 * @route GET /student/{idStudent}
 * @group student - Operations about student
 * @param {string} idStudent.path.required - idStudent
 * @returns {object} 200 - A student
 * @returns {Error}  404 - Student Not found
 */
// Récupère les étudiants par ID
router.route('/student/:idStudent').get(function async(req,res){
      student.findById(req.params.idStudent, function(err, student) {
        if (err)
          res.status(404).json(err);
        res.status(200).json(student);
      });
    });

/**
 * Get all group url
 * @route GET /group
 * @group group - Operations about group
 * @returns {object} 200 - All group
 * @returns {Error}  404 - Group Not found
 */
// Récupère les groupes
router.get("/group",async (req,res)=>{
  await group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Get a group url
 * @route GET /group/{idGroup}
 * @group group - Operations about group
 * @param {string} idGroup.path.required - idGroup
 * @returns {object} 200 - A group
 * @returns {Error}  404 - Group Not found
 */
// Récupère un groupe
router.route('/group/:idGroup').get(function async(req,res){
  group.findById(req.params.idGroup, function(err, group) {
    if (err)
        res.status(404).json(err);
    res.status(200).json(group);
  });
});

/**
 * Get a module url
 * @route GET /module
 * @group module - Operations about module
 * @returns {object} 200 - A module
 * @returns {Error}  404 - Module Not found
 */
// Recup tous les modules
router.get("/module",async (req,res)=>{
  await mod.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Get all professor's module url
 * @route GET /module/{idProfessor}
 * @group module - Operations about module
 * @param {string} idProfessor.path.required - idProfessor
 * @returns {object} 200 - All module of a professor
 * @returns {Error}  404 - Module Not found
 */
// Recup tous les modules d'un prof
router.get("/module/:idProfessor", async (req, res) => {
  try {
    const modules = await mod.find({ idProfessor: req.params.idProfessor})
      res.status(200).json(modules)
  } catch {
        res.status(404)
  }
});

/**
 * Get a module url
 * @route GET /module/{_id}
 * @group module - Operations about module
 * @returns {object} 200 - A module
 * @returns {Error}  404 - Module Not found
 */
// Recupérer un module
router.get("/modules/:_id", async (req, res) => {
  try {
    const module = await mod.findOne({ _id : req.params._id})
      res.status(200).json(module)
  } catch {
      res.status(404)
  }
})

/**
 * Get all exercise url
 * @route GET /exercise
 * @group exercise - Operations about exercise
 * @returns {object} 200 - A exercise
 * @returns {Error}  404 - Exercise Not found
 */
// Récupérer tous les exercices
router.get("/exercise",async (req,res)=>{
  await exercise.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a exercise url
 * @route GET /exercise/{idExercise}
 * @group exercise - Operations about exercise
 * @param {string} idExercise.path.required - idExercise
 * @returns {object} 200 - A exercise
 * @returns {Error}  404 - Exercise Not found
 */
// Récupérer un exercice
router.route('/exercise/:idExercise').get(function async(req,res){
  exercise.findById(req.params.idExercise, function(err, exercise) {
    if (err)
        res.status(404).json(err);
    res.status(200).json(exercise);
  });
});

/**
 * Get all studentRendering url
 * @route GET /studentRendering
 * @group studentRendering - Operations about studentRendering
 * @returns {object} 200 - A studentRendering
 * @returns {Error}  404 - Student Rendering Not found
 */
// Récupère tous les rendus de tous les étudiants
router.get("/studentRendering",async (req,res)=>{
  await studentRendering.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get all rendering for a student url
 * @route GET /studentRendering/{idStudent}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idStudent.path.required - idStudent
 * @returns {object} 200 - A studentRendering
 * @returns {Error}  404 - Student Rendering Not found
 */
// Récupérer tous les rendus pour un étudiant
router.get("/studentRendering/:idStudent", async (req, res) => {
  try {
    const rendus = await studentRendering.findOne({ idStudent: req.params.idStudent})
      res.status(200).json(rendus);
  } catch {
        res.status(404);
        res.send({ error: "404" });
  }
});

/**
 * Get all rendering for a exercise by a student url
 * @route GET /studentRendering/{idExercise}/{idStudent}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idExercise.path.required - idExercise
 * @param {string} idStudent.path.required - idStudent
 * @returns {object} 200 - All studentRendering for an exercise
 * @returns {Error}  404 - Student Rendering Not found
 */
// Récupérer les rendus d'un exercice pour un étudiant
router.get("/studentRendering/:idExercise/:idStudent", async (req, res) => {
  try {
    const exo = await studentRendering.findOne({ idExercise: req.params.idExercise, idStudent: req.params.idStudent })
      res.status(200).json(exo);
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

/**
 * Get a studentRendering url
 * @route GET /studentRendering/{idStudentRendering}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idStudentRendering.path.required - idStudentRendering
 * @returns {object} 200 - A studentRendering
 * @returns {Error}  404 - Student Rendering Not found
 */
// Récupérer un rendu par id
router.route('/studentRendering/:idStudentRendering').get(function async(req,res){
    studentRendering.findById(req.params.idStudentRendering, function(err, studentRendering) {
        if (err)
            res.status(404).json(err);
        res.status(200).json(studentRendering);
    });
});

/**
 * Get all correction url
 * @route GET /correction
 * @group correction - Operations about correction
 * @returns {object} 200 - A correction
 * @returns {Error}  404 - Correction Not found
 */
// Récupérer toutes les corrections
router.get("/correction",async (req,res)=>{
  await correction.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a correction url
 * @route GET /correction/{idCorrection}
 * @group correction - Operations about correction
 * @param {string} idCorrection.path.required - idCorrection
 * @returns {object} 200 - A correction
 * @returns {Error}  404 - Correction Not found
 */
// Récupérer Correction par ID
router.route('/correction/:idCorrection').get(function async(req,res){
  correction.findById(req.params.idCorrection, function(err, correction) {
    if (err)
        res.status(404).json(err)
    res.status(200).json(correction);
  });
});

/**
 * Get all TD url
 * @route GET /td
 * @group td - Operations about td
 * @returns {object} 200 - A td
 * @returns {Error}  404 - Td Not found
 */
// Récupérer tous les TDs
router.get("/td",async (req,res)=>{
  await td.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a TD url
 * @route GET /td/{idTD}
 * @group td - Operations about td
 * @param {string} idTD.path.required - idTD
 * @returns {object} 200 - A td
 * @returns {Error}  404 - Td Not found
 */
// Récupérer un TD
router.route('/td/:idTD').get(function async(req,res){
  td.findById(req.params.idTD, function(err, td) {
    if (err)
        res.status(404).json(err);
    res.status(200).json(td);
  });
});

/**
 * Get all exercise for a TD url
 * @route GET /exercises/{idTD}
 * @group exercise - Operations about exercise
 * @param {string} idTD.path.required - idTD
 * @returns {object} 200 - A exercise
 * @returns {Error}  404 - Exercise Not found
 */
// Récupérer tous les exercices d'un TD
router.get("/exercises/:idTD", async (req, res) => {
    try {
        const exs = await exercise.find({ idTD: req.params.idTD})
        res.status(200).json(exs)
    } catch {
        res.status(404)
    }
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
});

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
});

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
});

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
});

// Ajouter des groupes à un module
router.route("/module/:idModule/:idGroup").put(function(req, res) {
  mod.updateOne(
      { _id: req.params.idModule },
      { $push: { groups: [req.params.idGroup] } },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
  );
});

// Ajouter des modules à un groupe
router.route("/group/:idGroup/:idModule").put(function(req, res) {
  mod.updateOne(
      { _id: req.params.idGroup },
      { $push: { modules: [req.params.idModule] } },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
  );
});

// Ajouter des étudiants à un groupe
router.route("/group/:idGroup/:idStudent").put(function(req, res) {
  mod.updateOne(
      { _id: req.params.idGroup },
      { $push: { students: [req.params.idStudent] } },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
  );
});

// Ajouter un Exercice à un TD
router.put("/td/:idTD/:idExercise", async (req, res) => {
    try {
        //const exo = await exercise.findOne({ _id: req.params.idExercise})
        //console.log("EXO" + exo)
        const td = await td.findOne({ _id: req.params.idTD})
        console.log(td)
        //td.exercises.push(ex);
    } catch {
        res.status(404)
        res.send({ error: "404 " })
    }
});


// Ajouter un TD à un Module


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

