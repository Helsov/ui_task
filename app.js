const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const user = require('./user');

const app = express();

app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  var user_name = req.body.email;
  var password = req.body.password;
  user.validateSignIn(user_name,password, (result) => {
    if(result){
      res.send('Success')
    }
    else{
      res.send('Wrong username pass')
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

app.listen(3000, () => {
    console.log("Started listening on port", 3000);
})