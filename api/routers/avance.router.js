const AvanceModel=require("../models/avance.model")
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
    AvanceModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
})


route.post('/AddAvance',(req,res,next)=>{
    AvanceModel.PostNewAvance(req.body.nomD,req.body.prenomD,req.body.Date_depot,req.body.etat,req.body.somme,req.body.raison)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})



route.get('/getAllAvances',verifytoken,(req,res,next)=>{
    let token = req.headers.authorization
    let user= jwt.decode(token, { complete: true })
    AvanceModel.getAllAvances()
    .then((doc)=>res.status(200).json({avance:doc,user:user}))
    .catch((err)=>res.status(400).json(err))

})

route.get('/Avance/:id',verifytoken,(req,res,next)=>{
    AvanceModel.getOneAvance(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.delete('/Avance/:id',verifytoken,(req,res,next)=>{
    AvanceModel.deleteOneAvance(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.patch('/Avance/:id',verifytoken,(req,res,next)=>{
    AvanceModel.updateOneAvance(req.params.id,req.body.nomD,req.body.prenomD,req.body.Date_depot,req.body.etat,req.body.somme,req.body.raison,req.body.decision)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


module.exports=route