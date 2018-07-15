const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';

//Добавляем новую запись в post
addPost =  (name, title, subject, callback) => {
    MongoClient.connect(url, (err, client) => {
        const db = client.db('Blog'); 
        db.collection('post').insertOne( {
            "name": name,
            "title": title,
            "subject": subject
        }, (err, result) => {
            assert.equal(err, null);
            if(err == null){
                callback(true)
            }
            else{
                callback(false)
            }
        });
    });
}

//Получаем данные из БД из таблицы post
getPost = (callback) =>{
    MongoClient.connect(url, (err, client) => {
        const db = client.db('Blog');
        db.collection('post',(err, collection)=>{
            collection.find().toArray((err, list) => {
                callback(list)
            })
        })
    })
}

//Получаем данные о записи из БД по определенному идентификатору
getPostWithId = (id, callback) => {
    MongoClient.connect(url, (err, client) => {
        const db = client.db('Blog');
        db.collection('post').findOne({
            _id: new mongodb.ObjectID(id)
        },
        (err, result) => {
            assert.equal(err, null);
            console.log("Retrived the entry.");
            err == null ? callback(result) : callback(false);
        }
    )
    })
}

//Делаем запрос на обновление поста
updatePost = (id, title, subject, callback) => {
    MongoClient.connect(url, (err, client) => {
            const db = client.db('Blog');
            db.collection('post').updateOne( 
                { "_id": new mongodb.ObjectID(id) },
              { $set: 
                  { "title" : title,
                    "subject" : subject 
                  }
              }, (err, result) => {
            assert.equal(err, null);
            console.log("Статья обновлена");
            err == null ? callback(true) : callback(false)
        });
    });
}

//Делаем запрос на удаление поста
deletePost = (id, callback) => {
    MongoClient.connect(url, (err, client) => {
        var db = client.db('Blog');
        db.collection('post').deleteOne({
            _id: new mongodb.ObjectID(id)
        },(err, result) => {
            assert.equal(err, null);
            console.log('Элемент удален');
            err == null ? callback(true) : callback(false)
        })
    })
}

//Экспорт модулей
module.exports = {
    addPost,
    getPost,
    getPostWithId,
    updatePost,
    deletePost
}