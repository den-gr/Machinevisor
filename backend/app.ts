import { Database } from "./routes/DB/db_connector";
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const machinesRouter = require('./routes/machines');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//give static access to "public" folder 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/machines', machinesRouter);
app.use('/auth', authRouter);


app.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
    const db: Database = new Database();
    db.connectDB().catch((error: any) => {
        console.error("Can't connect to database.\n ", error);
        
    })
});

module.exports = app;

