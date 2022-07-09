import {Request, Response} from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import express = require('express');
import { DBService, DBService_mongo } from "../database/dbservice";
import status from 'http-status-codes';
import { makeErr, isNumber } from '../utils/utils';
import { ChartValue } from "@common/utils";
const jwt = require("jsonwebtoken");
const router = express.Router();
require('dotenv').config();


const db_service: DBService = new DBService_mongo();

/* GET home page. */
router.get('/test', function(req:Request, res:Response) {
  console.log("what happen")
  res.send("Whata")
  if(req.body.token){
    jwt.verify(req.body.token, process.env.SECRET, (err:JsonWebTokenError, authData:string) => {
        if(err){
          console.error(err.name + " | "  + err.message)
        }else{
          console.log("authDAta:", authData)
        }
    })
  }
});

router.get('/overview/mainValues', function(req:Request, res:Response) {
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


router.get('/overview/bestAndWorst', function(req:Request, res:Response) {
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
