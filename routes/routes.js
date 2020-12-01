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
var Binary = require('mongodb').Binary;


// -------------------------------------------
//             [Typedef Swagger]
// -------------------------------------------

/**
 * @typedef correction
 * @property {string} idExercise
 * @property {string} correctionCode
 * @property {string} content
 * @property {boolean} sendCorrection
 */

/**
 * @typedef exercise
 * @property {string} name
 * @property {string} idTD
 * @property {string} wording
 */

/**
 * @typedef group
 * @property {string} name
 * @property {Array} modules
 * @property {Array} students
 */

/**
 * @typedef module
 * @property {string} name
 * @property {string} content
 * @property {Array} groups
 * @property {string} idProfessor
 * @property {Array} tds
 */

/**
 * @typedef professor
 * @property {string} lastname
 * @property {string} firstname
 * @property {string} professorNumber
 * @property {string} email
 * @property {string} idModule
 */

/**
 * @typedef student
 * @property {string} lastname
 * @property {string} firstname
 * @property {string} studentNumber
 * @property {string} email
 * @property {string} idGroup
 */

/**
 * @typedef studentRendering
 * @property {string} idStudent
 * @property {string} idExercise
 * @property {string} content
 */

/**
 * @typedef td
 * @property {string} name
 * @property {string} idModule
 * @property {Array} exercises
 * @property {Date} dateLimit
 */

/**
 * @typedef user
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} type
 */

// -------------------------------------------
//                  [ POST ]
// -------------------------------------------

/**
 * Add a new professor
 * @route POST /professor
 * @group professor - Operations about professor
 * @returns {professor.model} 201 - A new professor is added
 * @returns {Error}  400 -  Bad Request
 */
// Ajout un professeur
router.post("/professor",async (req,res)=>{
    let newProfessor = new professor(req.body);
    await newProfessor.save().then((result)=>{
        res.status(201).json({ NewProfessor : "201 => https://cpel.herokuapp.com/api/professors/"+newProfessor._id})
    },(err)=>{
        res.status(400).json(err)
    })
});

/**
 * Add a new student
 * @route POST /student
 * @group student - Operations about student
 * @returns {student.model} 201 - A new student is added
 * @returns {Error}  400 - Bad Request
 */
// Ajout étudiant
router.post("/student",async (req,res)=>{
    let newStudent = new  student(req.body);
    await newStudent.save().then((result)=>{
        res.status(201).json({ NewStudent : "201 => https://cpel.herokuapp.com/api/professors/api/student/"+newStudent._id})
    },(err)=>{
        res.status(400).json(err)
    })
});

/**
 * Add a new user
 * @route POST /user
 * @group user - Operations about user
 * @returns {user.model} 201 - A new user is added
 * @returns {Error}  400 - Bad request
 */
router.post("/user",async (req,res)=>{
    const isUsernameExist = await user.findOne({ username: req.body.username });
    const isProfessorExist = await professor.findOne({ professorNumber: req.body.username });
    const isStudentExist = await student.findOne({ studentNumber: req.body.username });
    if ( isProfessorExist === null && req.body.type === "professor"){
        return res.status(401).json({ error: "Can't sign up" });
    }
    else if ( isStudentExist === null && req.body.type === "student"){
      return res.status(401).json({ error: "Can't sign up" });
    }
    else if(isUsernameExist) {
      return res.status(401).json({ error: "Email already exists" });
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        let newUser = new user(req.body);
        newUser.password = password;
        await newUser.save().then((result)=>{
          res.status(201).json({ NewUser : "201 => https://cpel.herokuapp.com/api/professors/"+newUser._id})
        },(err)=>{
          res.status(401).json(err)
        })
      }
});

/**
 * Add a new group
 * @route POST /group
 * @group group - Operations about group
 * @returns {group.model} 201 - A new group is added
 * @returns {Error}  400 - Bad request
 */
// Ajout d’un groupe étudiant
router.post("/group",async (req,res)=>{
  let newGroup = new  group(req.body);
  await newGroup.save().then((result)=>{
    res.status(201).json({ NewGroup : "201 => https://cpel.herokuapp.com/api/groups/"+newGroup._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Add a new module
 * @route POST /module
 * @group module - Operations about module
 * @returns {module.model} 201 - A new module is added
 * @returns {Error}  400 - Bad request
 */
// Ajout d'un module
router.post("/module",async (req,res)=>{
  let newModule = new mod(req.body);
    await newModule.save().then((result)=>{
    res.status(201).json({ NewModule : "201 => https://cpel.herokuapp.com/api/modules/"+newModule._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Add a new TD
 * @route POST /td
 * @group td - Operations about td
 * @returns {td.model} 201 - A new td
 * @returns {Error}  400 - Bad request
 */
// Ajout d'un TD
router.post("/td",async (req,res)=>{
    let newTD = new td(req.body);
    await newTD.save().then((result)=>{
        res.status(201).json({ NewTD : "201 => https://cpel.herokuapp.com/api/tds/"+newTD._id})
    },(err)=>{
        res.status(400).json(err)
    })
});

/**
 * Add a new exercise
 * @route POST /exercise
 * @group exercise - Operations about exercise
 * @returns {exercise.model} 201 - A new exercise is added
 * @returns {Error}  400 - Bad request
 */
// Ajout d’un exercice
router.post("/exercise",async (req,res)=>{
  let newExercise = new  exercise(req.body);
  await newExercise.save().then((result)=>{
    res.status(201).json({ NewExercise : "201 => https://cpel.herokuapp.com/api/exercises/"+newExercise._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Add a correction for an exercise
 * @route POST /correction
 * @group correction - Operations about correction
 * @returns {correction.model} 201 - A new correction is added
 * @returns {Error}  400 - Bad request
 */
// Ajout de la correction d’un exercice
router.post("/correction",async (req,res)=>{
  let newCorrection = new  correction(req.body);
  await newCorrection.save().then((result)=>{
    res.status(201).json({ NewCorrection : "201 => https://cpel.herokuapp.com/api/corrections/"+newCorrection._id})
  },(err)=>{
    res.status(400).json(err)
  })
});

/**
 * Add a new student rendering
 * @route POST /studentRendering
 * @group studentRendering - Operations about studentRendering
 * @returns {studentRendering.model} 201 - A new student rendering is added
 * @returns {Error}  400 - Bad request
 */
// Ajout du rendu pour un étudiant
router.post("/studentRendering",async (req,res)=>{
  let newStudentRendering = new  studentRendering(req.body);
  await newStudentRendering.save().then((result)=>{
    res.status(201).json({ NewRendering : "201 => https://cpel.herokuapp.com/api/studentRenderings/"+newStudentRendering._id})
  },(err)=>{
    res.status(400).json(err)
  })
});



// -----------------------------------------------
//                    [ GET ]
// -----------------------------------------------

/**
 * Get all users
 * @route GET /users
 * @group user - Operations about user
 * @returns {object} 200 - All Users
 * @returns {Error}  404 - Users Not found
 */
// Récupère les users
router.get("/users",async (req,res)=>{
    await user.find({}).then((result)=>{
        res.status(200).json(result)
    },(err)=>{
        res.status(404).json(err)
    })
});

/**
 * Get a user by id
 * @route GET /users/{idUser}
 * @group user - Operations about user
 * @param {string} idUser.path.required - The id of the user we are looking for
 * @returns {object} 200 - A user
 * @returns {Error}  404 - User Not found
 */
// Récupère un user
router.route('/users/:idUser').get(function async(req,res){
    user.findById(req.params.idUser, function(err, user) {
        if (err)
            res.send(err);
        res.status(200).json(user)
    });
});

/**
 * User Login
 * @route GET /login/{username}/{password}
 * @group user - Operations about user
 * @returns {user.model} 201 - Successful login
 * @returns {Error}  401 - unauthorized
 */
// Connexion d'un user
router.get("/login/:username/:password", async (req, res) => {
    const userLogin = await user.findOne({ username: req.params.username });
    if (!userLogin) return res.status(401).json({ error: "Nom d'utilisateur incorrect" });
    const validPassword = await bcrypt.compare(req.params.password, userLogin.password);
    if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect" });
    res.status(200).json({userLogin})
});

/**
 * Get all professors
 * @route GET /professors
 * @group professor - Operations about professor
 * @returns {object} 200 - All professors
 * @returns {Error}  404 - Professors Not found
 */
// Récupère tous les professeurs
router.get("/professors",async (req,res)=>{
  await professor.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a professor by id
 * @route GET /professors/{idProfessor}
 * @group professor - Operations about professor
 * @param {string} idProfessor.path.required - The id of the professor we are looking for
 * @returns {object} 200 - A professor
 * @returns {Error}  404 - Professor Not found
 */
// Récupère toutes les informations d’un professeur en fonction de son id
router.route('/professors/:idProfessor').get(function async(req,res){
      professor.findById(req.params.idProfessor, function(err, professor) {
        if (err)
          res.status(404).json(err);
        res.status(200).json(professor);
      });
    });

/**
 * Get all students
 * @route GET /students
 * @group student - Operations about student
 * @returns {object} 200 - All students
 * @returns {Error}  404 - Students Not found
 */
// Récupère tous les étudiants
router.get("/students",async (req,res)=>{
  await student.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a student by id
 * @route GET /students/{idStudent}
 * @group student - Operations about student
 * @param {string} idStudent.path.required - The id of the student we are looking for
 * @returns {object} 200 - A student
 * @returns {Error}  404 - Student Not found
 */
// Récupère les étudiants par ID
router.route('/students/:idStudent').get(function async(req,res){
      student.findById(req.params.idStudent, function(err, student) {
        if (err)
          res.status(404).json(err);
        res.status(200).json(student);
      });
    });

/**
 * Get all groups
 * @route GET /groups
 * @group group - Operations about group
 * @returns {object} 200 - All group
 * @returns {Error}  404 - Groups Not found
 */
// Récupère les groupes
router.get("/groups",async (req,res)=>{
  await group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a group by id
 * @route GET /groups/{idGroup}
 * @group group - Operations about group
 * @param {string} idGroup.path.required - The id of the student we are looking for
 * @returns {object} 200 - A group
 * @returns {Error}  404 - Group Not found
 */
// Récupère un groupe
router.route('/groups/:idGroup').get(function async(req,res){
  group.findById(req.params.idGroup, function(err, group) {
    if (err)
        res.status(404).json(err);
    res.status(200).json(group);
  });
});

/**
 * Get all modules
 * @route GET /modules
 * @group module - Operations about module
 * @returns {object} 200 - All modules
 * @returns {Error}  404 - Modules Not found
 */
// Recup tous les modules
router.get("/modules",async (req,res)=>{
  await mod.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get all professor's modules
 * @route GET /professors/{idProfessor}/modules
 * @group professor - Operations about professor
 * @param {string} idProfessor.path.required - The id of the professor whose modules we are looking for
 * @returns {object} 200 - All modules of a professor
 * @returns {Error}  404 - Modules Not found
 */
// tous les modules d'un prof
router.get("/professors/:idProfessor/modules", async (req, res) => {
  try {
    const modules = await mod.find({ idProfessor: req.params.idProfessor})
      res.status(200).json(modules)
  } catch {
        res.status(404)
  }
});

/**
 * Get a module
 * @route GET /modules/{idModule}
 * @group module - Operations about module
 * @param {string} idModule.path.required - The id of the module we are looking for
 * @returns {object} 200 - A module
 * @returns {Error}  404 - Module Not found
 */
// Recupérer un module
router.route('/modules/:idModule').get(function async(req,res){
    mod.findById(req.params.idModule, function(err, module) {
        if (err)
            res.status(404).json(err);
        res.status(200).json(module);
    });
});

/**
 * Get all exercises
 * @route GET /exercises
 * @group exercise - Operations about exercise
 * @returns {object} 200 - All exercises
 * @returns {Error}  404 - Exercises Not found
 */
// Récupérer tous les exercices
router.get("/exercises",async (req,res)=>{
  await exercise.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a exercise by id
 * @route GET /exercises/{idExercise}
 * @group exercise - Operations about exercise
 * @param {string} idExercise.path.required - The id of the exercise we are looking for
 * @returns {object} 200 - A exercise
 * @returns {Error}  404 - Exercise Not found
 */
// Récupérer un exercice
router.route('/exercises/:idExercise').get(function async(req,res){
  exercise.findById(req.params.idExercise, function(err, exercise) {
    if (err)
        res.status(404).json(err);
    res.status(200).json(exercise);
  });
});

/**
 * Get all studentRenderings
 * @route GET /studentRenderings
 * @group studentRendering - Operations about studentRendering
 * @returns {object} 200 - All studentRenderings
 * @returns {Error}  404 - Students Renderings Not found
 */
// Récupère tous les rendus de tous les étudiants
router.get("/studentRenderings",async (req,res)=>{
  await studentRendering.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a studentRenderings by id
 * @route GET /studentRenderings/{idStudentRendering}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idStudentRendering.path.required - The id of the studentRendering we are looking for
 * @returns {object} 200 - A studentRendering
 * @returns {Error}  404 - Student Rendering Not found
 */
// Récupérer un rendu par id
router.route('/studentRenderings/:idStudentRendering').get(function async(req,res){
    studentRendering.findById(req.params.idStudentRendering, function(err, studentRendering) {
        if (err)
            res.status(404).json(err);
        res.status(200).json(studentRendering);
    });
});

/**
 * Get all rendering for a student
 * @route GET /students/{idStudent}/studentRenderings
 * @group student - Operations about student
 * @param {string} idStudent.path.required - The id of the student whose rendering we are looking for
 * @returns {object} 200 - All student Rendering
 * @returns {Error}  404 - Student Renderings Not found
 */
// Récupérer tous les rendus pour un étudiant
router.get("/students/:idStudent/studentRenderings", async (req, res) => {
  try {
    const rendus = await studentRendering.find({ idStudent: req.params.idStudent})
      res.status(200).json(rendus);
  } catch {
        res.status(404);
        res.send({ error: "404" });
  }
});

/**
 * Get all rendering for a exercise by a student url
 * @route GET /students/{idStudent}/{idExercise}/studentRenderings
 * @group student - Operations about student
 * @param {string} idExercise.path.required - The id of the exercise whose rendering we are looking for
 * @param {string} idStudent.path.required - The id of the student whose rendering we are looking for
 * @returns {object} 200 - All studentRendering for an exercise
 * @returns {Error}  404 - Student Rendering Not found
 */
// Récupérer les rendus d'un exercice pour un étudiant
router.get("/students/:idStudent/:idExercise/studentRenderings", async (req, res) => {
  try {
    const exo = await studentRendering.find({ idStudent: req.params.idStudent, idExercise: req.params.idExercise })
      res.status(200).json(exo);
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
});

/**
 * Get all correction
 * @route GET /corrections
 * @group correction - Operations about correction
 * @returns {object} 200 - All corrections
 * @returns {Error}  404 - Corrections Not found
 */
// Récupérer toutes les corrections
router.get("/corrections",async (req,res)=>{
  await correction.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a correction by id
 * @route GET /corrections/{idCorrection}
 * @group correction - Operations about correction
 * @param {string} idCorrection.path.required - The id of the correction we are looking for
 * @returns {object} 200 - A correction
 * @returns {Error}  404 - Correction Not found
 */
// Récupérer Correction par ID
router.route('/corrections/:idCorrection').get(function async(req,res){
  correction.findById(req.params.idCorrection, function(err, correction) {
    if (err)
        res.status(404).json(err)
    res.status(200).json(correction);
  });
});

/**
 * Get all TD
 * @route GET /tds
 * @group td - Operations about td
 * @returns {object} 200 - All tds
 * @returns {Error}  404 - Tds Not found
 */
// Récupérer tous les TDs
router.get("/tds",async (req,res)=>{
  await td.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(404).json(err)
  })
});

/**
 * Get a TD by id
 * @route GET /tds/{idTD}
 * @group td - Operations about td
 * @param {string} idTD.path.required - The id of the td we are looking for
 * @returns {object} 200 - A td
 * @returns {Error}  404 - Td Not found
 */
// Récupérer un TD
router.route('/tds/:idTD').get(function async(req,res){
  td.findById(req.params.idTD, function(err, td) {
    if (err)
        res.status(404).json(err);
    res.status(200).json(td);
  });
});

/**
 * Get all exercise for a TD
 * @route GET /tds/{idTD}/exercises
 * @group td - Operations about td
 * @param {string} idTD.path.required - The id of the td whose exercises we are looking for
 * @returns {object} 200 - All exercise for the td
 * @returns {Error}  404 - Exercise Not found
 */
// Récupérer tous les exercices d'un TD
router.get('/tds/:idTD/exercises', async (req, res) => {
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

/**
 * Update a student
 * @route PUT /students/{idStudent}
 * @group student - Operations about student
 * @param {string} idStudent.path.required - The id of the student you want to update
 * @returns {object} 200 - Student updated
 * @returns {Error}  default - Unexpected error
 */
// MAJ d'un étudiant
router.put('/students/:idStudent', async (req, res) => {
    try {
        await student.findByIdAndUpdate(req.params.idStudent, req.body)
        await student.save()
        res.status(200).json({ Result : "200 - Student updated"});
    } catch (err) {
        res.status(400).json({ Result : "400 - Student not updated"});
    }
});

/**
 * Update student's group
 * @route PUT /students/group/{idStudent}
 * @group student - Operations about student
 * @param {string} idStudent.path.required - The id of the student you want to update
 * @returns {object} 200 - Student updated
 * @returns {Error}  default - Unexpected error
 */
// MAJ groupe d'un student
router.put('/students/group/:idStudent', function(req, res) {
    student.findByIdAndUpdate(req.params.idStudent,
        {idGroup:req.body.idGroup}, function(err, data) {
            if (err) {
                res.status(204).json({ Result : "204 - Student group not updated"})
            } else {
                res.status(200).json({ Result : "200 - Student group updated"})
            }
        });
});

/**
 * Update a professor
 * @route PUT /professors/{idProfessor}
 * @group professor - Operations about professor
 * @param {string} idProfessor.path.required - The id of the professor you want to update
 * @returns {object} 200 - Professor updated
 * @returns {Error}  default - Unexpected error
 */
// MAJ d'un professeur
router.put('/professors/:idProfessor', async (req, res) => {
    try {
        await professor.findByIdAndUpdate(req.params.idProfessor, req.body)
        await professor.save()
        res.status(200).json({ Result : "200 - Professor updated"})
    } catch (err) {
        res.status(204).json({ Result : "204 - Professor not updated"})
    }
});

/**
 * Update a exercise
 * @route PUT /exercises/{idExercise}
 * @group exercise - Operations about exercise
 * @param {string} idExercise.path.required - The id of the exercise you want to update
 * @returns {object} 200 - Exercise updated
 * @returns {Error}  default - Unexpected error
 */
router.put("/exercises/:idExercise", async (req, res) => {
    try {
        await exercise.findByIdAndUpdate(req.params.idExercise, req.body)
        await exercise.save()
        res.status(200).json({ Result : "200 - Exercise updated"})
    } catch (err) {
        res.status(204).json({ Result : "204 - Exercise not updated"})
    }
});

/**
 * Update a correction
 * @route PUT /corrections/{idCorrection}
 * @group correction - Operations about correction
 * @param {string} idCorrection.path.required - The id of the correction you want to update
 * @returns {object} 200 - Correction updated
 * @returns {Error}  default - Unexpected error
 */
router.put("/corrections/:idCorrection", async (req, res) => {
    try {
        await correction.findByIdAndUpdate(req.params.idCorrection, req.body)
        await correction.save()
        res.status(200).json({ Result : "200 - Correction updated"})
    } catch (err) {
        res.status(204).json({ Result : "204 - Correction not updated"})
    }
});

/**
 * Update a student rendering
 * @route PUT /studentRenderings/{idStudentRendering}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idStudentRendering.path.required - The id of the rendering you want to update
 * @returns {object} 200 - StudentRendering updated
 * @returns {Error}  default - Unexpected error
 */
router.put("/studentRenderings/:idStudentRendering", async (req, res) => {
    try {
        await studentRendering.findByIdAndUpdate(req.params.idStudentRendering, req.body)
        await studentRendering.save()
        res.status(200).json({ Result : "200 - Student Rendering updated"})
    } catch (err) {
        res.status(204).json({ Result : "204 - Student Rendering not updated"})
    }
});

/**
 * Add groups to a module
 * @route PUT /modules/{idModule}/{idGroup}
 * @group module - Operations about module
 * @param {string} idModule.path.required - The id of the module you want to add the group into
 * @param {string} idGroup.path.required - The id of the group you want to add
 * @returns {object} 200 - Group added
 * @returns {Error}  default - Unexpected error
 */
// Ajouter des groupes à un module
router.put("/modules/:idModule/:idGroup", async (req, res) => {
    try {
        const grp = await group.findOne({ _id: req.params.idGroup});
        grp.modules = [];
        mod.findOneAndUpdate(
            { _id: req.params.idModule },
            { $push: { groups: grp  } },
            { new: true, useFindAndModify: false },
        function (error, success) {
                if (error) {
                    res.status(204).json({ Result : "204 - Group not added"})
                } else {
                    res.status(200).json({ Result : "200 - Group added"})
                }
            });
    } catch {
        res.status(204)
        res.send({ error: "Group not added" })
    }
});

/**
 * Add module to a group
 * @route PUT /groups/{idGroup}/modules/{idModule}
 * @group group - Operations about group
 * @param {string} idGroup.path.required - The id of the group you want to add the modules into
 * @param {string} idModule.path.required - The id of the module you want to add
 * @returns {object} 200 - Module added
 * @returns {Error}  default - Unexpected error
 */
// Ajouter des modules à un groupe
router.put("/groups/:idGroup/modules/:idModule", async (req, res) => {
    try {
        const modul = await mod.findOne({ _id: req.params.idModule});
        modul.groups = [];
        group.findOneAndUpdate(
            { _id: req.params.idGroup },
            { $push: { modules: modul } },
            { new: true, useFindAndModify: false },
            function (error, success) {
                if (error) {
                    res.status(204).json({ Result : "204 - Module not added"})
                } else {
                    res.status(200).json({ Result : "200 - Module added"})
                }
            });
    } catch {
        res.status(404)
        res.send({ error: "404" })
    }
});

/**
 * Add students to a group
 * @route PUT /groups/{idGroup}/students/{idStudent}
 * @group group - Operations about group
 * @param {string} idGroup.path.required - The id of the group you want to add the students into
 * @param {string} idStudent.path.required - The id of the student you want to add
 * @returns {object} 200 - Student added
 * @returns {Error}  default - Unexpected error
 */
// Ajouter des étudiants à un groupe
router.put("/groups/:idGroup/students/:idStudent", async (req, res) => {
    try {
        const etudiant = await student.findOne({ _id: req.params.idStudent});
        group.findOneAndUpdate(
            { _id: req.params.idGroup },
            { $push: { students: etudiant } },
            { new: true, useFindAndModify: false },
            function (error, success) {
                if (error) {
                    res.status(404).json({ Result : "204 - Student not added"})
                } else {
                    res.status(200).json({ Result : "200 - Student added"})
                }
            });
    } catch {
        res.status(404)
        res.send({ error: "204 - Student not added" })
    }
});

/**
 * Add exercise to a TD
 * @route PUT /tds/{idTD}/{idExercise}
 * @group td - Operations about td
 * @param {string} idTD.path.required - The id of the TD you want to add the exercises into
 * @param {string} idExercise.path.required - The id of the exercise you want to add
 * @returns {object} 200 - Exercise added
 * @returns {Error}  default - Unexpected error
 */
// Ajouter un Exercice à un TD
router.put("/tds/:idTD/:idExercise", async (req, res) => {
    try {
        const exo = await exercise.findOne({ _id: req.params.idExercise});
        td.findOneAndUpdate(
            { _id: req.params.idTD },
            { $push: { exercises: exo } },
            { new: true, useFindAndModify: false },
            function (error, success) {
                if (error) {
                    res.status(204).json({ Result : "204 - Exercise not added"})
                } else {
                    res.status(200).json({ Result : "200 - Exercise added"})
                }
            });
    } catch {
        res.status(204)
        res.send({ error : "204 - Exercise not added" })
    }
});

/**
 * Add TD to a Module
 * @route PUT /modules/{idModule}/tds/{idTD}
 * @group module - Operations about module
 * @param {string} idModule.path.required - The id of the module you want to add the tds into
 * @param {string} idTD.path.required - The id of the td you want to add
 * @returns {object} 200 - TD added
 * @returns {Error}  default - Unexpected error
 */
// Ajouter un TD à un Module
router.put("/modules/:idModule/tds/:idTD", async (req, res) => {
    try {
        const newtd = await td.findOne({ _id: req.params.idTD});
        console.log(newtd);
        mod.findOneAndUpdate(
            { _id: req.params.idModule },
            { $push: { tds: newtd } },
            { new: true, useFindAndModify: false },
            function (error, success) {
                if (error) {
                    res.status(204).json({ Result : "204 - TD not added"})
                } else {
                    res.status(200).json({ Result : "200 - TD added"})
                }
            });
    } catch {
        res.status(404)
        res.send({ error: "204 - TD not added" })
    }
});

/**
 * Update user password
 * @route PUT /users/{idUser}
 * @group user - Operations about user
 * @param {string} idUser.path.required - username
 * @returns {object} 200 - user added
 * @returns {Error}  default - Unexpected error
 */

// Modifier un user
router.put('/users/:idUser', function(req, res) {
    user.findByIdAndUpdate(req.params.idUser,
        {password: bcrypt.hash(req.body.password, salt)}, function(err, data) {
            if (err) {
                res.status(204);
            } else {
                res.status(200);
            }
        });
});

// -----------------------------------------------
//                  [ DELETE ]
// -----------------------------------------------

/**
 * Delete professor
 * @route DELETE /professors/{idProfessor}
 * @group professor - Operations about professor
 * @param {string} idProfessor.path.required - The id of the professor to be deleted
 * @returns {object} 200 - professor deleted
 * @returns {Error}  404 - professor not found
 */
// Suppression d'un prof
router.delete("/professors/:idProfessor", async (req, res) => {
  try {
    await professor.deleteOne({ _id: req.params.idProfessor })
    res.status(200).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

/**
 * Delete student
 * @route DELETE /students/{idStudent}
 * @group student - Operations about student
 * @param {string} idStudent.path.required - The id of the student to be deleted
 * @returns {object} 200 - student deleted
 * @returns {Error}  404 - student not found
 */
// Suppression d'un student
router.delete("/students/:idStudent", async (req, res) => {
    try {
        await student.deleteOne({ _id: req.params.idStudent })
        res.status(200).send()
    } catch {
        res.status(404)
        res.send({ error: "404" })
    }
})

/**
 * Delete group
 * @route DELETE /groups/{idGroup}
 * @group group - Operations about group
 * @param {string} idGroup.path.required - The id of the group to be deleted
 * @returns {object} 200 - group deleted
 * @returns {Error}  404 - group not deleted
 */
// Suppression d'un groupe
router.delete("/groups/:idGroup", async (req, res) => {
  try {
    await group.deleteOne({ _id: req.params.idGroup })
    res.status(200).send()
  } catch {
    res.status(404)
    res.send({ error: "204" })
  }
})

/**
 * Delete td
 * @route DELETE /tds/{idTD}
 * @group td - Operations about td
 * @param {string} idTD.path.required - The id of the td to be deleted
 * @returns {object} 200 - td deleted
 * @returns {Error}  404 - td not deleted
 */
// Suppression d'un td
router.delete("/tds/:idTD", async (req, res) => {
    try {
        await td.deleteOne({ _id: req.params.idTD })
        res.status(200).send()
    } catch {
        res.status(404)
        res.send({ error: "204" })
    }
})

/**
 * Delete td
 * @route DELETE /modules/{idModule}
 * @group module - Operations about module
 * @param {string} idModule.path.required - The id of the module to be deleted
 * @returns {object} 200 - module deleted
 * @returns {Error}  404 - module not deleted
 */
// Suppression d'un module
router.delete("/modules/:idModule", async (req, res) => {
    try {
        await mod.deleteOne({ _id: req.params.idModule })
        res.status(200).send()
    } catch {
        res.status(404)
        res.send({ error: "404" })
    }
})

/**
 * Delete exercise
 * @route DELETE /exercises/{idExercise}
 * @group exercise - Operations about exercise
 * @param {string} idExercise.path.required - The id of the exercise to be deleted
 * @returns {object} 200 - exercise deleted
 * @returns {Error}  204 - exercise not deleted
 */
// Suppression d'un exercice
router.delete("/exercises/:idExercise", async (req, res) => {
  try {
    await exercise.deleteOne({ _id: req.params.idExercise })
    res.status(200).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

/**
 * Delete studentRendering
 * @route DELETE /studentRenderings/{idStudentRendering}
 * @group studentRendering - Operations about studentRendering
 * @param {string} idStudentRendering.path.required - The id of the rendering to be deleted
 * @returns {object} 200 - studentRendering deleted
 * @returns {Error}  404 - studentRendering not deleted
 */
// Supression d'un rendu
router.delete("/studentRenderings/:idStudentRendering", async (req, res) => {
  try {
    await studentRendering.deleteOne({ idExercise: req.params.id })
    res.status(200).send()
  } catch {
    res.status(404)
    res.send({ error: "404" })
  }
})

module.exports = router;

