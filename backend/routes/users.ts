import {Request, Response} from "express";
import { DBService_mongo } from "./DB/dbservice";
const utils = require('./utils/utils');
const express = require('express');
const router = express.Router();
const db_service = new DBService_mongo();

router.get('/:userId', async function(req:Request, res:Response) {
    if(utils.isNumber(req.params.userId)){
        let promise = db_service.getUser(+req.params.userId); //with implicit cast to number
        promise.then((user) =>{
            if(user != null){
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
