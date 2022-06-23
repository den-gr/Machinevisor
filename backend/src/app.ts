import { Request, Response, NextFunction} from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { Database } from "./database/db_connector";
import { SocketIOService } from "./routes/socket.io";
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware =  require('./routes/auth').authMiddleware;

const authRouter = require('./routes/auth').router;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const machinesRouter = require('./routes/machines');


const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const http = require('https');

const fs = require('fs');
var privateKey = fs.readFileSync( './ssl/key.pem' );
var certificate = fs.readFileSync( './ssl/certificate.pem');

const server = http.createServer({
    key: privateKey,
    cert: certificate
},app );


app.use(cors({credentials: true,  origin: true}))
app.use(logger('dev'));
app.use(cookieParser(process.env.SESSIONSECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));//give static access to "public" folder 
app.use("/socket.io", express.static(path.join(__dirname, '../nodes_module/socket.io/client-dist')))
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SESSIONSECRET,
    cookie: {
        maxAge: 1000 * 60 * 30 , // 30 min
        httpOnly: false,
        secure: true
    },
    store: new FileStore({ 
        reapInterval: 60 * 30  // each 30 minutes deletes expired sessions files
    }) 
}));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', authMiddleware,  usersRouter);
app.use('/machines',authMiddleware, machinesRouter);



SocketIOService.instance().initialize(server)

server.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
    const db: Database = new Database();
    db.connectDB().catch((error: any) => {
        console.error("Can't connect to database.\n ", error);
        
    })
});

// function verifyToken(req :Request, res: Response, next : NextFunction){
//     req.token = "bla";
//     next
// }



module.exports = app;

