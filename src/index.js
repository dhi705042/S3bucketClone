const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const route = require('./routes/s3Routes');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://dhiraj579:dhiraj579@cluster0.grf2f7z.mongodb.net/", { useNewUrlParser: true })
    .then(() => console.log('mongodb running perfectly on 27017'))
    .catch(err => console.log(err))

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/s3', require('./routes/s3Routes'));


app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});