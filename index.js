require('dotenv/config');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/routes');
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.json());

const { auth } = require('./middleware.js');

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