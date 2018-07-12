const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost';

addPost =  (title, subject, callback) => {
    MongoClient.connect(url, (err, client) => {
        const db = client.db('Blog'); 
        db.collection('post').insertOne( {
            "title": title,
            "subject": subject
        }, (err, result) => {
            assert.equal(err, null);
            console.log("Запись сохранена");
            if(err == null){
                callback(true)
            }
            else{
                callback(false)
            }
        });
    });
}

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

module.exports = {
    addPost,
    getPost
}