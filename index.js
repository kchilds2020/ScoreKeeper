require('dotenv/config');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');


app.use(bodyParser.json());
//location of frontend
app.use(express.static(path.join(__dirname,'public')));



//location of APIs
app.use('/', require('./apis/posts'));

app.listen(PORT, () => {console.log(`Server started on ${PORT}`);});