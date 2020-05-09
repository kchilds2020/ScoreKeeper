const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
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
                    res.redirect('/home');
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

         router.post('/api/create-game', async (req,res) => {
            console.log(req.body);
            let game = await db.collection('games').insertOne( {
                gameCreator: req.session.userID,
                gameName: req.body.gameName,
                winner: req.body.winner,
                winnerScore: req.body.winnerScore,
                completed: req.body.completed,
            });
            console.log(game);
            res.json(game); 
      
        }) 

        router.post('/add-player', async (req,res) => {
            console.log(req.body);

            console.log(req.params.id);
            let gameID = new ObjectId(req.body.gameID);

            let game = await db.collection('games').updateOne( {_id: gameID}, { $push: {users: {name: req.body.user, points: req.body.points}}} );
            //console.log(game);
            res.json(game); 
      
        })

        router.post('/update-points/:id', async (req,res) => {
            console.log(req.body);

            console.log(req.params.id);
            let gameID = new ObjectId(req.params.id);
            let gameUsers = await db.collection('games').findOne( {_id: gameID} );
            let users = gameUsers.users;
            for(i = 0; i < users.length; i++){
                if(users[i].name === req.body.user){
                    users.splice(i,1);
                    i--;
                }
            }
            users.push({name: req.body.user, points: req.body.points});
            console.log(users);

            let game = await db.collection('games').update( {_id: gameID}, { $set: {users: users}} );
            //console.log(game);
            res.json(game); 
      
        })

        router.post('/complete-game', async (req,res) => {
            console.log(req.body);
            let gameID = new ObjectId(req.body.gameID);
            let game = await db.collection('games').update( {_id: gameID}, {$set: {winner: req.body.winner, winnerScore: req.body.winnerScore, completed: 'true'}} );
            console.log(game);
            res.json(game); 
      
        })

        router.post('/delete-user', async (req,res) => {
            console.log(`req.body.gameID: ${req.body.gameID}, req.body.user: ${req.body.user}, req.body.totalPoints: ${req.body.totalPoints}`);
            let gameID = new ObjectId(req.body.gameID);
            let game = await db.collection('games').update( {_id: gameID}, { $pull: {users : {name: req.body.user }} } );
            console.log(game);
            res.json(game); 
      
        })

        router.post('/delete-game', async (req,res) => {
            console.log(`req.body.gameID: ${req.body.gameID}`);
            let game = await db.collection('games').remove( {_id: ObjectId(req.body.gameID)} );
            console.log(game);
            res.json(game); 
      
        })


    }

});

module.exports = router;