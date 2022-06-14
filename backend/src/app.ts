import { Database } from "./DB/db_connector";
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const machinesRouter = require('./routes/machines');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


const app = express();

app.use(cors({credentials: true,  origin: true}))
app.use(logger('dev'));
app.use(cookieParser(process.env.SESSIONSECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//give static access to "public" folder 
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SESSIONSECRET,
    cookie: {
        maxAge: 1000 * 60 * 10 , // 10 min
        httpOnly: false,
        secure: false
    },
    store: new FileStore({ 
        reapInterval: 60 // each 60 second delete expired sessions files
    }) 
}));


app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/machines', machinesRouter);


app.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
    const db: Database = new Database();
    db.connectDB().catch((error: any) => {
        console.error("Can't connect to database.\n ", error);
        
    })
});

module.exports = app;

