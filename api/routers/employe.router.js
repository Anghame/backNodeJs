
const employeModel=require("../models/employe.model")
const route = require('express').Router(); 
//require('dotenv').config()
const jwt = require('jsonwebtoken');
const { application } = require("express");

var privatekey='this is my secret keyyyyy'

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
    employeModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
})


/*route.post('/AddEmploye',(req,res,next)=>{
    employeModel.PostNewEmploye(req.body.Matricule,req.body.Nom,req.body.Prenom,req.body.email,req.body.Date_n,req.body.telephone)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})
username,password,Matricule,Nom,Prenom,email,Date_n,telephone,role
*/
route.post('/register',(req,res,next)=>{
    employeModel.register(req.body.username,req.body.password,req.body.Matricule,req.body.Nom,req.body.Prenom,req.body.email,req.body.Date_n,req.body.telephone,req.body.role)
    .then((doc)=>res.status(200).json({user:doc,msg:'added'}))
    .catch((err)=>res.status(400).json({error:err}))
})


route.post('/login',(req,res,next)=>{
    employeModel.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({token:token,msg:'jawou behii'}))
    .catch((err)=>res.status(400).json({error:err}))
})



route.get('/getAllEmploye',verifytoken,(req,res,next)=>{
    let token = req.headers.authorization
    let user= jwt.decode(token, { complete: true })
    employeModel.getAllEmployees()
    .then((doc)=>res.status(200).json({employe:doc,user:user}))
    .catch((err)=>res.status(400).json(err))

})

route.get('/Employee/:id',verifytoken,(req,res,next)=>{
    employeModel.getOneEmployee(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.delete('/Employee/:id',(req,res,next)=>{
    employeModel.deleteOneEmployee(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})


route.patch('/Employee/:id',verifytoken,(req,res,next)=>{
    employeModel.updateOneEmployee(req.params.id,req.body.Matricule,req.body.Nom,req.body.Prenom,req.body.email,req.body.Date_n,req.body.telephone)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

})

module.exports=route