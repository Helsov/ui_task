const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const user = require('./user');
const session = require('express-session');
const post = require('./post');

const app = express();
//Основная часть бэкенда на NodeJS. Передаем данные со стороны клиента на сервер
//Главная страница приложеиня и метод для "разбора" данных в json и создаем сессию
app.use(express.static(path.join(__dirname,"/html"))).use(session({secret: 'my-secret', resave: true, saveUninitialized: true}));

app.use(bodyParser.json());

var sessions;

//Разбиваем данные из json
app.post('/signin', (req, res) => {
  sessions = req.session;
  var user_name = req.body.name;
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

//Добавляем обработчик запроса из user.js
app.post('/signup', (req, res) => { //Принимаем обработанные данные
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  //Если данные введены корректно то отправляем в метод user.js для добавления записи в БД
  name && email && password ? user.signup(name, email, password) : res.send('Failure');
})

//Добавляем новую страницу, в случае совпадения сессии и имени то перенаправлять в Home
app.get('/home', (req, res)=>{
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/html/home.html')
  } else {
    res.sendFile(__dirname + '/html/index.html');
  }
})

//Обработчик отправки данных в БД, в нашем случае добавляем новую запись
app.post('/addpost',(req, res)=>{
  var name = sessions.username;
  var title = req.body.title;
  var subject = req.body.subject;
  var id = req.body.id;
console.log(id);
  if(id == '' || id == undefined){
    console.log('Запись создана')
    post.addPost(name, title, subject, (result)=>{
      res.send(result)
    })
  } else {
    console.log('Запись изменена', title, subject)
    post.updatePost(id, title, subject, (result)=>{
      res.send(result)
    })
  }
})

//Получение данных
app.post('/getpost', (req, res) => {
  post.getPost((result) => {
    res.send(result)
  })
})

//Делаем запрос данных для получения информации о редактируемой статье
app.post('/getPostWithId', (req, res) => {
  var id = req.body.id;
  console.log(req.body);
  post.getPostWithId(id,(result) => {
    res.send(result)
    console.log(result)
  })
})

//Запрос на удаление поста
app.post('/deletePost', (req, res) => {
  var id = req.body.id;
  post.deletePost(id, (result) => {
    res.send(result)
  })
})


//404 ошибка
app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/html/404.html');
});

//Подключаемся к порту 30000
app.listen(3000, () => {
    console.log("Погнали", 3000);
})