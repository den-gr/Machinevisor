import { Request, Response} from "express";
import { DBService_mongo } from "../database/dbservice";
import { IAuth, IUser } from "../database/models/user_schema";
import status from 'http-status-codes';
import { request } from "http";
import { stat } from "fs";
const hash = require('pbkdf2-password')()
const path = require('path');
const session = require('express-session');
const express = require('express');
const app = express();
const router = express.Router();
const db_service = new DBService_mongo();

router.post('/sign_in', (req:Request, res:Response) => {
    if(req.body.password && req.body.username){
        db_service.getAuth(req.body.username).then((auth: IAuth) => {
            hash({password: req.body.password, salt: auth.salt}, function(err: Error, pass:string, salt: string, hash: string){
                if(err) res.status(status.INTERNAL_SERVER_ERROR).send(err);
                if(hash === auth.password_hash){
                    req.session.username = req.body.username
                    res.send("Your password is correct")

                }else{
                    res.status(status.UNAUTHORIZED).send("Wrong password"); //401
                }
            })
        }).catch((error) => res.status(status.UNAUTHORIZED).send(error)); //TODO  gestire vari tipi di errori
    }else{
        res.status(status.BAD_REQUEST).send("Password or username is not inserted")
    }

})

router.post('/sign_up', (req:Request, res:Response) => {
    if(req.body.password || req.body.username){
        hash({password: req.body.password}, function(err: Error, pass:string, salt: string, hash: string){
            if(err) res.status(status.INTERNAL_SERVER_ERROR).send(err);
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
                }else if(error.errorType === "ValidationError"){
                    res.status(status.BAD_REQUEST).send(error.message)
                }else{
                    res.status(status.INTERNAL_SERVER_ERROR).send(error);
                }
            })
        });
    }else{
        res.status(status.BAD_REQUEST).send("Password or username is not inserted")
    }   
});

router.get("/logout", (req:Request, res:Response) => {
    req.session.destroy;
    res.clearCookie("connect.sid")
    res.send("cookies destoried")
})

module.exports = router;

