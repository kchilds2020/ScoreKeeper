const express = require('express');
const router = express.Router();
const path = require('path')
var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
const dbName = "score-keeper";
const saltRounds = 10;
const directory = path.join(__dirname, '../');
const { auth, redirectLogin, redirectHome  } = require('./middleware.js');

MongoClient.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true } ,function(err, client) {
    if(err) { 
        return console.log('Failed connecting to server: ', err);
    }else{
        const db = client.db(dbName);

        //add item to specific grocery list

        router.get('/', redirectHome ,(req,res,next) => {

            res.sendFile(directory + 'pages/index.html', function (err) {
                if (err) { next(err) } else { console.log('Sent:', directory + 'index.html') }
            })
        })
        router.get('/register', redirectHome, (req,res,next) => {
        
            res.sendFile(directory + 'pages/register.html', function (err) {
                if (err) { next(err) } else { console.log('Sent:', directory + 'register.html') }
            })
        })
        router.get('/score', redirectLogin ,(req,res,next) => {
        
            res.sendFile(directory + 'pages/score.html', function (err) {
                if (err) { next(err) } else { console.log('Sent:', directory + 'score.html') }
            })
        })
        router.get('/timer', redirectLogin ,(req,res,next) => {
        
            res.sendFile(directory + 'pages/timer.html', function (err) {
                if (err) { next(err) } else { console.log('Sent:', directory + 'timer.html') }
            })
        })
        router.get('/games', redirectLogin , (req,res,next) => {
        
            res.sendFile(directory + 'pages/games.html', function (err) {
                if (err) { next(err) } else { console.log('Sent:', directory + 'games.html') }
            })
        })
    }
});





module.exports = router;


