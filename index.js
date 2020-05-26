const express = require('express'); //use express
const app = express(); //object to use express as app
const bodyParser = require('body-parser');
const config = require('./config.json');
const port = process.env.PORT ? process.env.PORT: config.app.port ? config.app.port: 4000;
const bind = process.env.BIND ? process.env.BIND: config.app.bind? config.app.bind: '127.0.0.1';

//let usersController = require('./app/controllers/users')(); //create variable to indicate where search users
let usersController = require('./app/controllers/users_firebase')(); //create variable to indicate where search users
let reportsController = require('./app/controllers/reports')();
let loginController = require('./app/controllers/login')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); //configuration to accept elements of body
app.use('/users',usersController);
app.use('/reports',reportsController);
app.use('/login',loginController);

app.listen(port,bind,function(){
    console.log("***********************************");
    console.log("*************Running***************");
    console.log('***'+config.app.name+'***');
    console.log("***********************************");
});