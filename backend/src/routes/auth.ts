import { NextFunction, Request, Response} from "express";
import { DBService_mongo } from "../database/dbservice";
import { IAuth} from "../database/models/user_schema";
import { JsonWebTokenError } from "jsonwebtoken";
import { makeErr } from '../utils/utils';
import status from 'http-status-codes';
import express = require('express');
import passwordValidator = require('password-validator');
import { nextTick } from "process";
require('dotenv').config();
const jwt = require("jsonwebtoken");
const hash = require('pbkdf2-password')()
const router = express.Router();
const db_service = new DBService_mongo();

const password_schema = new passwordValidator();
password_schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits

//Login
router.post('/sign_in', (req:Request, res:Response) => {
    if(req.body.password && req.body.email){
        db_service.getAuth(req.body.email).then((auth: IAuth) => {
            console.log(auth)
            checkToken(req,res, auth)
        }).catch((error) => res.status(status.UNAUTHORIZED).send(makeErr(error.errorType, error.message))); //TODO gestire vari tipi di errori
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request","Password or email is not inserted"))
    }

})

//registration
router.post('/sign_up', (req:Request, res:Response, next:NextFunction) => {
    if(req.body.password || req.body.email){
        if(password_schema.validate(req.body.password)){
            next();
        }else{
            res.status(status.BAD_REQUEST).send(makeErr("Bad request","Password must have: from 8 to 100 characters, one digit and one uppercase and lowercase letter"))
        }
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request","Password or email is not inserted"))
    }   
}, createPasswordHash);


const options = { // token options
    expiresIn: "2h"
}

//Control token is valid
function checkToken(req:Request, res:Response, auth: IAuth){
    hash({password: req.body.password, salt: auth.salt}, function(err: Error, pass:string, salt: string, hash: string){
        if(err) res.status(status.INTERNAL_SERVER_ERROR).send(err);
        if(hash === auth.password_hash){
            const token_data = {
                email: req.body.email,
            }
            jwt.sign(token_data, process.env.SECRET, options, (err:JsonWebTokenError, token: string) => {
                if(err){ // not valid token
                    res.status(status.INTERNAL_SERVER_ERROR).send(makeErr(err.name, err.message))
                }else{ // OK
                    console.log("My token", token)
                    res.json({token, user_id: auth.user_id})
                }
            })
        }else{
            res.status(status.UNAUTHORIZED).send(makeErr("Unauthorized", "Wrong password")); //401
        }
    })
}

function createPasswordHash(req:Request, res:Response){
    hash({password: req.body.password}, function(err: Error, pass:string, salt: string, hash: string){
        if(err) res.status(status.INTERNAL_SERVER_ERROR).send(err);
        req.body.auth = {};
        req.body.auth.password_hash = hash;
        req.body.auth.salt = salt;
        delete req.body.password;
        let promise = db_service.addUser(req.body); //with implicit cast to IUser
        promise.then((user) =>{
            res.status(status.CREATED).json(user);
        }).catch((error) => {
            if(error.errorType === "DuplicateUsername"){    
                res.status(status.CONFLICT).send(makeErr(error.errorType, error.message)) // 409
            }else if(error.errorType === "ValidationError"){
                res.status(status.BAD_REQUEST).send(makeErr(error.errorType, error.message)) //400
            }else{
                res.status(status.INTERNAL_SERVER_ERROR).send(makeErr(error.errorType, error.message)); //500
            }
        })
    });
}

module.exports.authMiddleware = function authMiddleware(req: Request, res: Response, next: NextFunction){
    if(req.headers.authorization && req.headers.authorization?.split(" ")[0] === "Bearer"){
        jwt.verify(req.headers.authorization?.split(" ")[1], process.env.SECRET, (err:JsonWebTokenError, authData:string) => {
            if(err){
                res.status(status.UNAUTHORIZED).send(makeErr(err.name, err.message)); //401
            }else{
                next();
            }
        })
    }else{
        res.status(status.UNAUTHORIZED).send(makeErr("Unauthorized", "You must sign in")); //401
    }
}

module.exports.router = router;