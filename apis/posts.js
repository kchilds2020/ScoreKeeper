const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
const saltRounds = 10;

const dbName = "score-keeper";
var assert = require('assert');


MongoClient.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client) {
    if(err) { 
        return console.log('Failed connecting to server: ', err);
    }else{
        const db = client.db(dbName);

        //add item to specific grocery list
        router.post('/register', (req, res) => {

            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                let data = db.collection('users').insert({
                    firstname: req.body.firstName,
                    lastname: req.body.lastName,
                    username: req.body.username,
                    password: hash
                })
                .then(results => {
                    console.log(results);
                    res.json(results);
                })
                .catch(error => console.error(error))
                })
        });

    }

});

module.exports = router;