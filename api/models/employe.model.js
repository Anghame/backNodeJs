const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
//require('dotenv').config()

const schemaValidation = Joi.object({
    Matricule:Joi.number()
    .required(),
    Nom:Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    Prenom:Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'tn'] } }).required(),
    Date_n:Joi.required(),
   
    telephone :Joi.number().required(),
    role:Joi.string().required()
})

let employeSchema=mongoose.Schema({
    Matricule:String,
    Nom:String,
    Prenom:String,
    email:String,
    Date_n:String,
   
    telephone : Number,
    role :String,
    username:String,
    password:String

});


 mongoose.models = {}
 var Employe = mongoose.model('employe', employeSchema);

 let url = 'mongodb://localhost:27017/rhDB'
 exports.testConnect=()=>{
     return new Promise((resolve,reject)=>{ 
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         mongoose.disconnect()
         resolve('connected !')

     }).catch((err)=>reject(err))
    })
}

exports.register=(username,password,Matricule,Nom,Prenom,email,Date_n,telephone,role)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return  Employe.findOne({email:email})
   

    }).then((doc)=>{
        if(doc){
            mongoose.disconnect()
            reject('we have this user in our data base  ')
        }else{ 
            bcrypt.hash(password,10).then((hashedPassword)=>{
                let employe=new Employe({
                    username:username,
                    
                    password:hashedPassword,
                    Matricule:Matricule,
                    Nom:Nom,
                    Prenom:Prenom,
                    email:email,
                    Date_n:Date_n,
                    telephone : telephone,
                    role:role

                })
                employe.save().then((employe)=>{
                    mongoose.disconnect()
                    resolve(employe)

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
      return  Employe.findOne({email:email})
   

    }).then((employe)=>{
        if(!employe){
            mongoose.disconnect()
            reject('we dont have this email in our data base ')
        }else{ 
            bcrypt.compare(password,employe.password).then((same)=>{

        if (same){
           let token= jwt.sign({id: employe._id , username:employe.username },privatekey,{expiresIn:'5h'})
           mongoose.disconnect()
           resolve({token:token,role:employe.role,id:employe._id,username:employe.username,nom:employe.Nom,prenom:employe.Prenom})

 
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

/*
exports.PostNewEmploye=(Matricule,Nom,Prenom,email,Date_n,telephone)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       let v= schemaValidation.validate({Matricule:Matricule,Nom:Nom,Prenom:Prenom,email:email,email:email,Date_n:Date_n,telephone:telephone});
        if(v.error)
        {
            mongoose.disconnect()
            reject(v.error.details[0].message)
        }

       let employe=new Employe ({
        Matricule:Matricule,
        Nom:Nom,
        Prenom:Prenom,
        email:email,
        Date_n:Date_n,
        telephone : telephone
    
       })
       employe.save().then((doc)=>{
           mongoose.disconnect()
           resolve(doc)
       }).catch((err)=>{
        mongoose.disconnect
        reject(err)})

        
    }).catch((err)=>reject(err))
   })
}

*/

exports.getAllEmployees=()=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Employe.find()

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}




exports.getOneEmployee=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Employe.findById(id)

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}


exports.deleteOneEmployee=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Employe.deleteOne({_id:id})

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}



exports.updateOneEmployee=(id,Matricule,Nom,Prenom,email,Date_n,telephone)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Employe.updateOne({_id:id},{
        Matricule:Matricule,
        Nom:Nom,
        Prenom:Prenom,
        email:email,
        Date_n:Date_n,
        telephone : telephone
    
       })

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}
