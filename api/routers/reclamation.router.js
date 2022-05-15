const RecalamtionModel=require("../models/reclamation.model")
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







route.get('/',(req,res,next)=>{
    RecalamtionModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
})


route.post('/AddReclamation',verifytoken,(req,res,next)=>{
    RecalamtionModel.PostNewReclamation(req.body.nomD,req.body.prenomD,req.body.Date_depot,req.body.etat,req.body.type_R,req.body.text_R)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})


route.get('/getAllReclamations',verifytoken,(req,res,next)=>{
    let token = req.headers.authorization
    let user= jwt.decode(token, { complete: true })
    RecalamtionModel.getAllReclamations()
    .then((doc)=>res.status(200).json({reclamation:doc,user:user}))
    .catch((err)=>res.status(400).json(err))

})

route.get('/Reclamation/:id',verifytoken,(req,res,next)=>{
    RecalamtionModel.getOneReclamation(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.delete('/Reclamation/:id',verifytoken,(req,res,next)=>{
    RecalamtionModel.deleteOneReclamation(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.patch('/Reclamation/:id',verifytoken,(req,res,next)=>{
    RecalamtionModel.updateOneReclamation(req.params.id,req.body.Date_depot,req.body.etat,req.body.type_R,req.body.text_R,req.body.decision)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


module.exports=route