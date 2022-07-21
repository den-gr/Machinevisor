import {Request, Response} from "express";
import express = require('express');
import { DBService, DBService_mongo } from "../database/dbservice";
import status from 'http-status-codes';
import { makeErr} from '../utils/utils';
import { ChartValue } from "@common/utils";
const router = express.Router();
require('dotenv').config();

const db_service: DBService = new DBService_mongo();

router.get('/mainValues', function(req:Request, res:Response) {
  db_service.getMainOverviewValues().then(ris => {
    if(ris !== null && ris.length > 0){
      res.json(ris[0])
    }else{
      res.json({
          kWattAvg : 0,
          msgsForMinute : 0,
          allarms : 0
      })
    }
  }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
});


router.get('/bestAndWorst', function(req:Request, res:Response) {
  db_service.getWorkingTime().then((ris: ChartValue[]) => {
    let best: ChartValue = ris[0];
    let worst: ChartValue = ris[0];
     ris.forEach(e => {
        if(e.value > best.value){
          best = e;
        }
        if(e.value < worst.value){
          worst = e;
        }
     })
     res.json({
        worst: worst.label,
        best: best.label
     })
  }).catch((err)=> res.status(status.INTERNAL_SERVER_ERROR).send(makeErr("ServerError", err)));
});

module.exports = router;