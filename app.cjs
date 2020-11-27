const express = require('express');
const app = express();

const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const connexionChain = 'mongodb+srv://CPEL_USER:coucoucpel@cluster0.82glw.mongodb.net/CPEL?retryWrites=true&w=majority'



var routes = require('./routes/routes');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});app.use(bodyParser.json());
app.use(express.json()) // new
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
  res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', routes);


mongoose.connect(connexionChain, { useUnifiedTopology: true, useNewUrlParser: true  })
    .then(client => {
      console.log('Base de données : OK')
    })

app.listen(process.env.PORT || 3000, function() {
  console.log('Server : OK');
})

module.exports = app;

