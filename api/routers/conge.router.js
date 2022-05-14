const congeModel=require("../models/conge.model")
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
    congeModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
})


route.post('/Addconge',verifytoken,(req,res,next)=>{
    congeModel.PostNewconge(req.body.nomD,req.body.prenomD,req.body.Date_depot,req.body.etat,req.body.date_d,req.body.nombre_jour,req.body.typeConge)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})
//Date_depot:Date_depot,etat:etat,date_d:date_d,nombre_jour:nombre_jour,typeConge:typeConge

route.get('/getAllconges',verifytoken,(req,res,next)=>{
    let token = req.headers.authorization
    let user= jwt.decode(token, { complete: true })
    congeModel.getAllconges()
    .then((doc)=>res.status(200).json({conge:doc,user:user}))
    .catch((err)=>res.status(400).json(err))

})

route.get('/conge/:id',verifytoken,(req,res,next)=>{
    congeModel.getOneconge(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.delete('/conge/:id',verifytoken,(req,res,next)=>{
    congeModel.deleteOneconge(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.patch('/conge/:id',verifytoken,(req,res,next)=>{
    congeModel.updateOneconge(req.params.id,req.body.nomD,req.body.prenomD,req.body.Date_depot,req.body.etat,req.body.date_d,req.body.nombre_jour,req.body.typeConge,,req.body.decision)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


module.exports=route