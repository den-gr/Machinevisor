import {NextFunction, Request, Response} from "express";
import { DBService_mongo } from "./DB/dbservice";
import { IAuth, IUser } from "./DB/models/user_schema";
import status from 'http-status-codes';
import { request } from "http";
const hash = require('pbkdf2-password')()
const path = require('path');
const session = require('express-session');
const express = require('express');
const app = express();
const router = express.Router();
const db_service = new DBService_mongo();
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));


router.post('/sign_in', (req:Request, res:Response) => {

})


router.post('/sign_up', (req:Request, res:Response) => {
    if(req.body.password && req.body.username){
        hash({password: req.body.password}, function(err: Error, pass:string, salt: string, hash: string){
            if(err) throw err;
            req.body.auth = {};
            req.body.auth.password_hash = hash;
            req.body.auth.salt = salt;
            delete req.body.password;
            let promise = db_service.addUser(req.body); //with implicit cast to IUSer
            promise.then((user) =>{
                res.status(status.CREATED).json(user);
            }).catch((error) => {
                if(error.errorType === "DuplicateUsername"){    
                    res.status(status.CONFLICT).send(error) // 409
                }else{
                    res.status(status.INTERNAL_SERVER_ERROR).send(error);
                }
            })
        });
    }else{
        res.status(status.BAD_REQUEST).send("Password or username is not inserted")
    }   
});

module.exports = router;

