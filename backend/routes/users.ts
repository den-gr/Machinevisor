import {Request, Response} from "express";
import { DBService_mongo } from "./DB/dbservice";
var utils = require('./utils/utils');
var express = require('express');
var router = express.Router();
const db_service = new DBService_mongo();

router.get('/:userId', async function(req:Request, res:Response) {
    if(utils.isNumber(req.params.userId)){
        let promise = db_service.getUser(+req.params.userId); //with implicit cast to number
        promise.then((user) =>{
            if(user != null){
                console.log("REceive: ", user)
                res.json(user);
            }else{
                res.status(404).send('User not found');
            }
        });
    }else{
        res.status(400).send("UserId is not a number");
    }
});

module.exports = router;
