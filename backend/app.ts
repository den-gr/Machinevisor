import { Database } from "./routes/DB/db";

require('dotenv').config();
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var machinesRouter = require('./routes/machines');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/machines', machinesRouter);


var port = process.env.PORT;
app.listen(port, () => {
    const db: Database = new Database();
    db.connectDB();
    console.log("connect on ", port);
    
});


module.exports = app;

