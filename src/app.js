require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const usersRoute = require('./app/routes/users.routes');
const teams = require('./app/routes/teams.routes');
const indexRoute = require('./app/routes/index.routes');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    next();
});

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/teams', teams);

module.exports = app;