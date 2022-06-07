import {Request, Response} from "express";
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req:Request, res:Response) {
  if(req.params.userId){
    res.send('respond with a resource ' + req.params.userId);

  }else{
    res.send("no value");
  }

});

module.exports = router;
