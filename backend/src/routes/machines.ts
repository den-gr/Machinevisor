import {Request, Response} from "express";
import { DBService_mongo } from "../database/dbservice";
import status from 'http-status-codes';
import { makeErr, isNumber } from '../utils/utils';
import express = require('express');

const router = express.Router();
const db_service = new DBService_mongo();
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
                res.status(status.NOT_FOUND).send(makeErr("Not found","Machine not fount"));
            }
        }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
        
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request", "MachineId is not a number"));
    }
})

router.get("/:machineId/charts", authMiddleware, (req: Request, res: Response)  => {
    if(isNumber(req.params.machineId)){
        res.json(getFakeData())
       
    }else{
        res.status(status.BAD_REQUEST).send(makeErr("Bad request", "MachineId is not a number"));
    }
});


function getFakeData(): Object[]{
    let temperatures: Object[] = []
    let date = new Date();
    for(let i = 0; i < 20; i++){
        temperatures.push({
            value: parseFloat((20 + Math.random() * 10).toFixed(2)),
            label: date
        })
        date = new Date(date.getTime() + (1000 * 60 * 60 * 24))
    }

    let kWatts : Object[] = []
    date = new Date();
    for(let i = 0; i < 20; i++){
        kWatts.push({
            value: parseFloat((4 + Math.random()).toFixed(2)),
            label: date
        })
        date = new Date(date.getTime() + (1000 * 60 * 60 * 24))
    }

    
    let bla : Object[] = []
    date = new Date();
    for(let i = 0; i < 5; i++){
        bla.push({
            value: parseFloat((4 + Math.random()).toFixed(2)),
            label: date
        })
        date = new Date(date.getTime() + (1000 * 60 * 60 * 24))
    }

    let obj = [
        {
            type: "temperature",
            values: temperatures
        },
        {
            type: "kWatt",
            values: kWatts
        },
        {
            type: "machine_oil_level",
            values: bla
        }
    ]
    return obj;
}

module.exports = router;