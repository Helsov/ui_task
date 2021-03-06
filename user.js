const MongoClient = require('mongodb').MongoClient; //Подключаем компонент MongoDB для работы с базой
const assert = require('assert'); //Библиотека для проверки возвращенного ответа
const url = 'mongodb://admin:admin1234@ds243041.mlab.com:43041/mydatabase'; //И так понятно

	//Обработка данных для регистрации
	signup = (name, email, password)=>{
		MongoClient.connect(url, (err, client) => {
            const db = client.db('mydatabase');  
            db.collection('user').insertOne( {
				"name": name,
				"email": email,
				"password": password
			},(err, result)=>{
                assert.equal(err, null);
                console.log(result);
		    	console.log("Зарегистрирован новый пользователь");
			});
		});
	}
	//Обработка введенных данных для авторизации
	validateSignIn = (username, password,callback) => {
		MongoClient.connect(url, (err, client) => {
            const db = client.db('mydatabase');  
			//console.log(username,password);
			db.collection('user').findOne( { "name" : username ,"password": password 
			}, (err, result) => {
				if(result == null){
					console.log('returning false')
					callback(false)
				}
				else{
					console.log('returning true')
					callback(true)
				}
			});
		});
	}

module.exports = {
	signup,
	validateSignIn
}