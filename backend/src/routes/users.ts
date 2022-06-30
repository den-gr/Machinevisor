import {Request, Response} from "express";
import { DBService_mongo } from "../database/dbservice";
import status from 'http-status-codes';
const {makeErr, isNumber} = require('../utils/utils');
const express = require('express');
const router = express.Router();
const db_service = new DBService_mongo();

router.get('/:userId', (req:Request, res:Response) => {
    if(isNumber(req.params.userId)){
        let promise = db_service.getUser(+req.params.userId); //with implicit cast to number
        promise.then((user) =>{
            if(user != null){
                res.json(user);
            }else{
                res.status(status.NOT_FOUND).send(makeErr("Not found",'User not found'));
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
    }else{
        res.status(status.BAD_REQUEST)
            .json(makeErr("Bad request", "UserId is not a number"));
    }
});



module.exports = router;
