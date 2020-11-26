const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const connexionChain = 'mongodb+srv://CPEL_USER:coucoucpel@cluster0.82glw.mongodb.net/CPEL?retryWrites=true&w=majority'
var routes = require('./routes/routes');
const expressSwagger = require('express-swagger-generator')(app);
mongoose.set('useFindAndModify', false);
let options = {
    swaggerDefinition: {
        info: {
            description: 'CPEL API CRUD',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'https://cpel.herokuapp.com',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};

app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});app.use(bodyParser.json());
app.use(express.json()) // new
app.use('/api', routes);

mongoose.connect(connexionChain, { useUnifiedTopology: true, useNewUrlParser: true  })
    .then(client => {
      console.log('Base de données : OK')
    });

expressSwagger(options);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server : OK');
})

module.exports = app;

