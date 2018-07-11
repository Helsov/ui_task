const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const user = require('./user');
const session = require('express-session');

const app = express();

app.use(express.static(path.join(__dirname,"/html")));
app.use(session({secret: 'my-secret', resave: true, saveUninitialized: true}));

app.use(bodyParser.json());

var sessions;

app.post('/signin', (req, res) => {
  sessions = req.session;
  var user_name = req.body.email;
  var password = req.body.password;
  sessions.username = user_name;
  console.log(sessions);
  user.validateSignIn(user_name,password, (result) => {
    if(result){
      sessions.username = user_name;
      res.send('Success');
    }
  });
  
  
  
})

app.post('/signup', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if(name && email && password){
  	user.signup(name, email, password)
  }
  else{
  	res.send('Failure');
  }
})

app.get('/home', (req, res)=>{
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/html/home.html')
  } else {
    res.sendFile(__dirname + '/html/index.html');
  }
})

app.listen(3000, () => {
    console.log("Started listening on port", 3000);
})