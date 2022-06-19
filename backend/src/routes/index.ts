import {Request, Response} from "express";
import { JsonWebTokenError } from "jsonwebtoken";
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();
/* GET home page. */
router.get('/test', function(req:Request, res:Response) {
  console.log("what happen")
  res.send("Whata")
  if(req.body.token){
    jwt.verify(req.body.token, process.env.SECRET, (err:JsonWebTokenError, authData:string) =>{
        if(err){
          console.error(err.name + " | "  + err.message)
        }else{
          console.log("authDAta:", authData)
        }
    } )

  }
  // res.send("Expressss A. \n your session: " + req.session.username)
  // console.log("Session id", req.sessionID)

});

module.exports = router;
