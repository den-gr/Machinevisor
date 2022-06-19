import {Request, Response} from "express";
import { DBService_mongo } from "../database/dbservice";
import status from 'http-status-codes';
const {makeErr, isNumber} = require('../utils/utils');
const express = require('express');
const router = express.Router();
const db_service = new DBService_mongo();

router.get("/:machineId", (req: Request, res: Response)  => {
    if(isNumber(req.params.machineId)){
        let promise = db_service.getMachine(+req.params.machineId);
        promise.then((machine) => {
            if(machine != null){
                res.json(machine);
            }else{
                res.status(status.NOT_FOUND).send(makeErr("Not found","Machine not fount"));
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
        
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request", "MachineId is not a number"));
    }
})


router.get("/", (req: Request, res: Response)  => {
    let promise = db_service.getMachineList();
    promise.then((machines) => {
        res.send(machines)
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
})

module.exports = router;