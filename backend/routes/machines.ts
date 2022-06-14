import {Request, Response} from "express";
import { DBService_mongo } from "./DB/dbservice";
import status from 'http-status-codes';
const utils = require('./utils/utils');
const express = require('express');
const router = express.Router();
const db_service = new DBService_mongo();

router.get("/:machineId", (req: Request, res: Response)  => {
    if(utils.isNumber(req.params.machineId)){
        let promise = db_service.getMachine(+req.params.machineId);
        promise.then((machine) => {
            if(machine != null){
                res.json(machine);
            }else{
                res.status(status.NOT_FOUND).send("Machine not fount");
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(err));;
        
    }else{
        res.status(status.BAD_REQUEST).send("MachineId is not a number");
    }
})

module.exports = router;