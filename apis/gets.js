const express = require('express');
const router = express.Router();
const path = require('path')
var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
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
        router.get('/home', redirectLogin ,(req,res,next) => {
        
            res.sendFile(directory + 'pages/home.html', function (err) {
                if (err) { next(err) } else { console.log('Sent:', directory + 'home.html') }
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
        router.get('/api/completed-games', redirectLogin , async (req,res,next) => {
            console.log('call established');
            let games = await db.collection('games').find( {gameCreator: req.session.userID, completed: 'true'} ).toArray();
            console.log(games);
            res.json(games);
        })
        router.get('/api/active-games', redirectLogin , async (req,res,next) => {
            console.log('call established');
            let games = await db.collection('games').find( {gameCreator: req.session.userID, completed: 'false'} ).toArray();
            console.log(games);
            res.json(games);
        })
        router.get('/game/:id', redirectLogin , async (req,res,next) => {
            console.log('call established');
            console.log(req.params.id);
            let gameID = new ObjectId(req.params.id);
            let game = await db.collection('games').find( {_id: gameID} ).toArray();
            console.log(game);
            res.json(game);
        })
    }
});





module.exports = router;


