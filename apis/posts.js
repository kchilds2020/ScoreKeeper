const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
const saltRounds = 10;
const { auth, redirectLogin, redirectHome  } = require('./middleware.js');

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
                    username: req.body.userName,
                    password: hash
                })
                .then(results => {
                    console.log(`New ID: ${results.ops[0]._id}`);
                    req.session.userID = results.ops[0]._id;
                    res.redirect('/score');
                })
                .catch(error => console.error(error))
                })
        });

        router.post('/login', async (req,res) => {
            const {userName, password} = req.body;

            let user = await db.collection('users').find( {username: userName} ).toArray(); 
            console.log(user[0]._id);
            bcrypt.compare(password, user[0].password, function(err, isMatch) {
                if (err) {
                    throw err
                } else if (!isMatch) {
                    res.status('404');
                } else {
                    console.log(user[0]._id)
                    req.session.userID = user[0]._id
                    console.log(req.session.userID);
                    res.redirect('/home')
                } 
            })          
        })

    }

});

module.exports = router;