const express = require('express');
const router = express.Router();
const path = require('path')
const directory = path.join(__dirname, '../');


router.get('/', (req,res,next) => {

    res.sendFile(directory + 'pages/index.html', function (err) {
        if (err) { next(err) } else { console.log('Sent:', directory + 'index.html') }
    })
})
router.get('/register', (req,res,next) => {

    res.sendFile(directory + 'pages/register.html', function (err) {
        if (err) { next(err) } else { console.log('Sent:', directory + 'register.html') }
    })
})
router.get('/score', (req,res,next) => {

    res.sendFile(directory + 'pages/score.html', function (err) {
        if (err) { next(err) } else { console.log('Sent:', directory + 'score.html') }
    })
})
router.get('/timer', (req,res,next) => {

    res.sendFile(directory + 'pages/timer.html', function (err) {
        if (err) { next(err) } else { console.log('Sent:', directory + 'timer.html') }
    })
})
router.get('/games', (req,res,next) => {

    res.sendFile(directory + 'pages/games.html', function (err) {
        if (err) { next(err) } else { console.log('Sent:', directory + 'games.html') }
    })
})




module.exports = router;


