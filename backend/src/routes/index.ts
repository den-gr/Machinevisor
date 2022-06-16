import {Request, Response} from "express";
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response) {
  console.log("what happen")
  res.send("Whata")
  // res.send("Expressss A. \n your session: " + req.session.username)
  // console.log("Session id", req.sessionID)

});

module.exports = router;
