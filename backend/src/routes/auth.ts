import { Request, Response} from "express";
import { DBService_mongo } from "../database/dbservice";
import { IAuth, IUser } from "../database/models/user_schema";
import status from 'http-status-codes';
import { request } from "http";
import { stat } from "fs";
import { JsonWebTokenError } from "jsonwebtoken";
import e = require("cors");
require('dotenv').config();
const {makeErr} = require('../utils/utils');
const jwt = require("jsonwebtoken");
const hash = require('pbkdf2-password')()
const path = require('path');
const session = require('express-session');
const express = require('express');
const app = express();
const router = express.Router();
const db_service = new DBService_mongo();

router.post('/sign_in', (req:Request, res:Response) => {
    if(req.body.password && req.body.email){
        db_service.getAuth(req.body.email).then((auth: IAuth) => {
            hash({password: req.body.password, salt: auth.salt}, function(err: Error, pass:string, salt: string, hash: string){
                if(err) res.status(status.INTERNAL_SERVER_ERROR).send(err);
                if(hash === auth.password_hash){
                    req.session.email = req.body.email
                    
                    const token_data = {
                        email: req.body.email,
                    }

                    const options = {
                        expiresIn: "1h"
                    }

                    jwt.sign(token_data, process.env.SECRET, options, (err:JsonWebTokenError, token: string) => {
                        if(err){
                            res.status(status.INTERNAL_SERVER_ERROR).send(makeErr(err.name,err.message))
                        }else{
                            console.log("My token", token)
                            res.json({token})
                        }
                    })


                }else{
                    res.status(status.UNAUTHORIZED).send(makeErr("Unauthorized", "Wrong password")); //401
                }
            })
        }).catch((error) => res.status(status.UNAUTHORIZED).send(makeErr(error.errorType, error.message))); //TODO  gestire vari tipi di errori
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request","Password or email is not inserted"))
    }

})

router.post('/sign_up', (req:Request, res:Response) => {
    if(req.body.password || req.body.email){
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
                    res.status(status.CONFLICT).send(makeErr(error.errorType, error.message)) // 409
                }else if(error.errorType === "ValidationError"){
                    res.status(status.BAD_REQUEST).send(makeErr(error.errorType, error.message))
                }else{
                    res.status(status.INTERNAL_SERVER_ERROR).send(makeErr(error.errorType, error.message));
                }
            })
        });
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request","Password or email is not inserted"))
    }   
});

router.get("/logout", (req:Request, res:Response) => {
    req.session.destroy;
    res.clearCookie("connect.sid")
    res.json({})
})

module.exports = router;

