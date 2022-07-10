import {Request, Response} from "express";
import { DBService, DBService_mongo } from "../database/dbservice";
import status from 'http-status-codes';
import { makeErr, isNumber } from '../utils/utils';
import express = require('express');
import { IMachine } from "src/database/models/machine_schema";

const router = express.Router();
const db_service: DBService = new DBService_mongo();
const authMiddleware =  require('./auth').authMiddleware;

router.get("/", (req: Request, res: Response)  => {
    let promise = db_service.getMachineList();
    promise.then((machines) => {
        res.send(machines)
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
})

router.get("/:machineId", authMiddleware, (req: Request, res: Response)  => {
    if(isNumber(req.params.machineId)){
        let promise = db_service.getMachine(+req.params.machineId);
        promise.then((machine) => {
            if(machine != null){
                res.json(machine);
            }else{
                res.status(status.NOT_FOUND).send(makeErr("Not found","Machine not found"));
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
        
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request", "MachineId is not a number"));
    }
})

router.get("/:machineId/charts", authMiddleware, (req: Request, res: Response)  => {
    if(isNumber(req.params.machineId)){
        let promise = db_service.getMachine(+req.params.machineId);
        promise.then((machine: IMachine | null) => {
            if(machine != null){
                let mach = machine as IMachine;
                db_service.getMachineCharts(+req.params.machineId, mach.values).then(ris => {
                    let aggregatedResult: { [key: string]: Object[] } = ris[0];
                    
                    let obj = []
                    for(let prop in aggregatedResult){
                        console.log(prop)
                        
                        obj.push({
                            type: prop,
                            values: aggregatedResult[prop]

                        })
                    }
                    console.log(obj);
                    res.json(obj);

               })

            }else{
                res.status(status.NOT_FOUND).send(makeErr("Not found","Machine not found"));
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
       
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request", "MachineId is not a number"));
    }
});


router.get("/:machineId/logs/:limit", authMiddleware, (req: Request, res: Response)  => {
    if(isNumber(req.params.machineId)){
        let promise = db_service.getLogs(+req.params.machineId, +req.params.limit);
        promise.then((logs) => {
            if(logs != null){
                res.json(logs);
            }else{
                res.status(status.NOT_FOUND).send(makeErr("Not found","Logs not found"));
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
       
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request", "MachineId is not a number"));
    }
});

module.exports = router;