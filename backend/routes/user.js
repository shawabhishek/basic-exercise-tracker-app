const user=require('../model/user_model')
const express = require("express");
const router = new express.Router();

router.post('/users/add',(req,res)=>{
    var newuser=new user(req.body);
    newuser.save((err,Users)=>{
        if(err)
        res.status(400).send(err);

        res.status(201).send(Users);
    })
})

router.get('/users/',(req,res)=>{
    user.find({},(err,Users)=>{
        if (err) 
        res.status(500).send(err);
        
        res.json(Users);
    })
})

module.exports=router;