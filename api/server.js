const express = require('express')
const app=express()
const mongoose = require('mongoose')
//mongoose.Promise = global.Promise //To use the native js promises

const employeRouter=require('./routers/employe.router')
const userRouter=require('./routers/user.router')
const avanceRouter=require('./routers/avance.router')
const congeRouter=require('./routers/conge.router')
const RecalamtionRouter=require('./routers/reclamation.router')
const DecisionRouter=require('./routers/decision.router')



app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    //res.setHeader('Access-Control-Request-Methods','*')
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT");
    res.setHeader('Access-Control-Allow-Headers','*')
    
    next()

})

app.use('/',employeRouter)

app.use('/',userRouter)
app.use('/',avanceRouter)
app.use('/',congeRouter)
app.use('/',RecalamtionRouter)
app.use('/',DecisionRouter)

app.listen(4040,()=>{console.log('server run with port 4040')})
