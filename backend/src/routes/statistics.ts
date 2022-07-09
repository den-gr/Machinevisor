import {Request, Response} from "express";
import status from 'http-status-codes';
import { DBService_mongo } from "../database/dbservice";
import { makeErr, isNumber } from '../utils/utils';
import express = require('express');
import { IMachine } from "src/database/models/machine_schema";

const router = express.Router();
const db_service = new DBService_mongo();

router.get('/defaultValues', (req:Request, res:Response) => {
    db_service.getMachinesAvgValues().then(ris => {
        res.json(ris[0])
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));

})

router.get('/allarms', (req:Request, res:Response) => {
    db_service.getMachinesAllarms().then(ris => {
        console.log(ris)
        res.json(ris)
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
})

router.get('/activeTime', (req:Request, res:Response) => {
    db_service.getWorkingTime().then(ris => {
        res.json(ris)
    }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
})

module.exports = router;