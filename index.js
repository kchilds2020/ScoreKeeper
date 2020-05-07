require('dotenv/config');
const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();
const router = require('./apis/gets');
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var session = require('express-session');
const axios = require('axios');
var MongoClient = require('mongodb').MongoClient;
const dbName = "score-keeper";
app.use(bodyParser.json());

const { auth, redirectLogin, redirectHome  } = require('./apis/middleware.js');

app.use(cors())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2}
}));

app.use(express.static(path.join(__dirname,'public')));

//static html routes
app.use(router);

//location of APIs
app.use('/', require('./apis/posts'));

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);})