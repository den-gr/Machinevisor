import {Request, Response} from "express";
import status from 'http-status-codes';
import { DBService_mongo } from "../database/dbservice";
import { makeErr, isNumber } from '../utils/utils';
import express = require('express');
import { IMachine } from "src/database/models/machine_schema";

const router = express.Router();
const db_service = new DBService_mongo();

router.get('/defaultValues', (req:Request, res:Response) => {
    res.json(getFakeValues())

})


router.get('/allarms', (req:Request, res:Response) => {
    db_service.getMachineList().then(list =>{
   
        res.json(getFakeErrors(list))
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));

})


router.get('/activeTime', (req:Request, res:Response) => {
    db_service.getMachineList().then(list =>{
   
        res.json(getFakeWorkingTimes(list))
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
})

function getFakeWorkingTimes(list: IMachine[]): Object[]{
    let objs: Object[] = [];
    list.forEach(e => {
        objs.push({
            value: parseFloat((4 + Math.random()*20).toFixed(1)),
            label: e.machine_name
        })
    })
    return objs;
}

function getFakeErrors(list: IMachine[]): Object[]{
    let objs: Object[] = [];
    list.forEach(e => {
        objs.push({
            value: Math.random() > 0.5 ? 2 : 1,
            label: e.machine_name
        })
    })
    return objs;
}

function getFakeValues(): Object{
    let temperatures: number[] = []
    let kWatts : number[] = []
    let dates: Date[] = []
    let date = new Date();
    for(let i = 0; i < 20; i++){
        temperatures.push(parseFloat((20 + Math.random() * 10).toFixed(2)))
        kWatts.push(parseFloat((4 + Math.random()*3).toFixed(2)))
        dates.push(new Date(date.getTime() + (1000 * 60 * 60 * 24)))
    }

    let obj = {
            temperatures: temperatures,
            kWatts: kWatts,
            dates: dates
    }
    return obj;
}

module.exports = router;