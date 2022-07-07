import { Database } from "./database/db_connector";
import { SocketIOService } from "./routes/socket.io";
import express = require('express');
import path = require('path');
import logger = require('morgan');
import cors = require('cors');
import http = require('https');
import fs = require('fs');
require('dotenv').config();

const app = express();

//SSL
var privateKey = fs.readFileSync( './ssl/key.pem' );
var certificate = fs.readFileSync( './ssl/certificate.pem');
const server = http.createServer({
    key: privateKey,
    cert: certificate
},app );

//Middlewares
app.use(cors({credentials: true,  origin: true}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));//give static access to "public" folder 
app.use("/socket.io", express.static(path.join(__dirname, '../nodes_module/socket.io/client-dist')))


//Routing
const authMiddleware =  require('./routes/auth').authMiddleware;
const authRouter = require('./routes/auth').router;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const machinesRouter = require('./routes/machines');
const statisticsRouter = require('./routes/statistics');
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', authMiddleware,  usersRouter);
app.use('/machines', machinesRouter);
app.use('/statistics', statisticsRouter);

//Run server
SocketIOService.instance().initialize(server)
server.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
    const db: Database = new Database();
    db.connectDB().catch((error: any) => {
        console.error("Can't connect to database.\n ", error);
        
    })
});

module.exports = app;