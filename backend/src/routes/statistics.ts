import {Request, Response} from "express";
import { DBService, DBService_mongo } from "../database/dbservice";
import { makeErr } from '../utils/utils';
import status from 'http-status-codes';
import express = require('express');

const router = express.Router();
const db_service: DBService = new DBService_mongo();

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