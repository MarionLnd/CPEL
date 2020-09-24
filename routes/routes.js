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


// Récupère le nom, prénom, mot de passe et email


// Récupère tous les étudiants
router.get("/api/student",(req,res)=>{
  student.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});


// Récupère les étudiants par ID
router.get("/api/student/:idStudent",(req,res)=>{
  student.find({idStudent : req.params.idStudent}).then((result)=>{
    res.status(200).json({message : "Personne trouvé"})
    res.status(200).json(result);
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère les groupes
router.get("/api/group",(req,res)=>{
  group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});

// Récupère un groupe
router.get("/api/group/:idGroupe",(req,res)=>{
  group.find({idGroupe : req.params.idGroupe}).then((result)=>{
    res.status(200).json({message : "Personne trouvé"})
    res.status(200).json(result);
  },(err)=>{
    res.status(400).json(err)
  })
});


// Récupérer tous les exercices
router.get("/api/exercise",(req,res)=>{
  group.find({}).then((result)=>{
    res.status(200).json(result)
  },(err)=>{
    res.status(400).json(err)
  })
});


// Récupérer un exercice
router.get("/api/exercise/:idExercie",(req,res)=>{
  group.find({idExercie : req.params.idExercie}).then((result)=>{
    res.status(200).json({message : "Personne trouvé"})
    res.status(200).json(result);
  },(err)=>{
    res.status(400).json(err)
  })
});




module.exports = router;
