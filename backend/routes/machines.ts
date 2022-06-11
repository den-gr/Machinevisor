import {Request, Response} from "express";
import { DBService_mongo } from "./DB/dbservice";
var utils = require('./utils/utils');
var express = require('express');
var router = express.Router();
const db_service = new DBService_mongo();

router.get("/:machineId", async (req: Request, res: Response)  => {
    if(utils.isNumber(req.params.machineId)){
        let promise = db_service.getMachine(+req.params.machineId);
        promise.then((machine) => {
            if(machine != null){
                console.log("send machine:", machine);
                res.json(machine);
            }else{
                res.status(404).send("Machine not fount");
            }
        });
        
    }else{
        res.status(400).send("MachineId is not a number");
    }
})

module.exports = router;