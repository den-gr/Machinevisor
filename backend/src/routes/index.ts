import {Request, Response} from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
require('dotenv').config();

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

router.get('/overview', function(req:Request, res:Response) {
    res.json({
      consumption: 888,
      detected_allarms: 8,
      messages_every_minute: 10,
    })
});

module.exports = router;
