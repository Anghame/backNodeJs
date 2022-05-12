
    const decisionModel=require("../models/decision.model")
    const route = require('express').Router(); 
    require('dotenv').config()
    const jwt = require('jsonwebtoken');
    const { application } = require("express");
    
    var privatekey='this is my secret keyyyyy'
    
    let verifytoken=(req,res,next)=>{
       let token = req.headers.authorization
       if (!token)
       {
    
        res.status(400).json({msg:"access rejected !"})
       }
    
       try{
           
        jwt.verify(token,privatekey)
        next()
       }catch(e){
           
    
        res.json({msg:e})
    
       }
    }
    
    let verifytokenRH=(req,res,next)=>{
        let token = req.headers.authorization
        let role=req.headers.role
        if (!token || role!='RH')
        {
     
         res.status(400).json({msg:"access rejected !"})
        }
     
        try{
            
         jwt.verify(token,privatekey)
         next()
        }catch(e){
            
     
         res.json({msg:e})
     
        }
     }
    
    
    
    
    
    
    route.get('/',(req,res,next)=>{
        decisionModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
    })
    
    
    route.post('/AddDecision',verifytoken,(req,res,next)=>{
        decisionModel.PostNewdecision(req.body.Date_D,req.body.type_D,req.body.cause_D)
        .then((doc)=>res.status(200).json(doc))
        .catch((err)=>res.status(400).json(err))
    })
    
    
    route.get('/getAllDecisions',verifytoken,(req,res,next)=>{
        let token = req.headers.authorization
        let user= jwt.decode(token, { complete: true })
        decisionModel.getAlldecisions()
        .then((doc)=>res.status(200).json({decision:doc,user:user}))
        .catch((err)=>res.status(400).json(err))
    
    })
    
    route.get('/Decision/:id',verifytoken,(req,res,next)=>{
        decisionModel.getOnedecision(req.params.id)
        .then((doc)=>res.status(200).json(doc))
        .catch((err)=>res.status(400).json(err))
    
    })
    
    
    route.delete('/Decision/:id',verifytoken,(req,res,next)=>{
        decisionModel.deleteOnedecision(req.params.id)
        .then((doc)=>res.status(200).json(doc))
        .catch((err)=>res.status(400).json(err))
    
    })
    /*
Date_D:String,
    type_D: Number,
    cause_D:String

 */
    
    route.patch('/Decision/:id',verifytoken,(req,res,next)=>{
        decisionModel.updateOnedecision(req.params.id,req.body.Date_D,req.body.type_D,req.body.cause_D)
        .then((doc)=>res.status(200).json(doc))
        .catch((err)=>res.status(400).json(err))
    
    })
    
    
    module.exports=route