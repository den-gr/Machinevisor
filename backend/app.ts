import { Database } from "./routes/DB/db_connector";
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const machinesRouter = require('./routes/machines');

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//give static access to "public" folder 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/machines', machinesRouter);

const db: Database = new Database();
db.connectDB();

app.listen(process.env.PORT, () => {
    console.log("connect on ", process.env.PORT);
});

module.exports = app;

