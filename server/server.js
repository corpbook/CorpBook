const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
//const querystring = require('querystring');
const cors = require('cors');
// const request = require('request');
// const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const taskController = require('./controllers/TaskControllers')

const loginController = require('./controllers/LoginController')
const authenticationController = require('./controllers/AuthenticationController')

const port = process.env.PORT || 3000;

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(express.static(__dirname + '/index.html'))
   .use(cors())
   .use(cookieParser());
  
//OAuth Route handlers  

const loginRouter = express.Router();
app.use('/login', loginRouter);

loginRouter.get('/', loginController.login, (req,res) => {
  res.status(200)
})

const authRouter = express.Router();
app.use('/linkedin/callback', authRouter);

authRouter.get('/', authenticationController.authenticate, taskController.createAccount, loginController.loginToHome, (req, res, next) => {
  console.log(res.locals.doc)
 
  res.status(200)
})


// serve index.html on the route '/'



//DATABASE SETUP --------------

mongoose.connect('mongodb+srv://houta483:Pitbull92929@cluster0-42vnx.gcp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

const userRouter = express.Router();

userRouter.post('/', taskController.createAccount, (req, res) => {
  res.status(200).send(res.locals.doc);
});

userRouter.get('/:name', taskController.getUser, (req, res) => {
  res.status(200).json(res.locals.doc)
});

userRouter.get('/', taskController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.doc)
});

userRouter.patch('/:name', taskController.changeUser, (req, res) => {
  res.status(200).end();
})


userRouter.delete('/:name', taskController.deleteUser, (req, res) => {
  res.status(200).end();
})

app.use('/user', userRouter)

app.use((err, req, res, next) => 
  res.status(418).end());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });



app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});