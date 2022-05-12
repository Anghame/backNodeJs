const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let schemaUser = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    

});


let url ='mongodb://localhost:27017/rhDB'
mongoose.models = {}
var User = mongoose.model('user', schemaUser);


exports.register=(username,email,password)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return  User.findOne({email:email})
   

    }).then((doc)=>{
        if(doc){
            mongoose.disconnect()
            reject('we have this user in our data base  ')
        }else{ 
            bcrypt.hash(password,10).then((hashedPassword)=>{
                let user=new User({
                    username:username,
                    email:email,
                    password:hashedPassword

                })
                user.save().then((user)=>{
                    mongoose.disconnect()
                    resolve(user)

                }).catch((err)=>
                { mongoose.disconnect()
                reject(err)
                
                })
            }).catch((err)=>
            { mongoose.disconnect()
            reject(err)
            
            })

        }
    })
   })
}




var privatekey="this is my secret keyyyyy"

exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return  User.findOne({email:email})
   

    }).then((user)=>{
        if(!user){
            mongoose.disconnect()
            reject('we dont have this email in our data base ')
        }else{ 
            bcrypt.compare(password,user.password).then((same)=>{

        if (same){
           let token= jwt.sign({id: user._id , username:user.username },privatekey,{expiresIn:'2h'})
           mongoose.disconnect()
           resolve(token)

 
        }else{
            mongoose.disconnect()
            reject('invalid password')
        }
              
        
            
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)

            })

        }
    })
   })
}