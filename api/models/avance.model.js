const mongoose = require('mongoose')
//const Joi = require('joi')
const Joi = require('joi')
    .extend(require('@joi/date'));
require('dotenv').config()


const schemaValidation = Joi.object({
    decision:Joi.boolean(),
    somme:Joi.number()
    .required(),
    nomD: Joi.string()
    .required(),
    prenomD: Joi.string()
    .required(),
    etat: Joi.string()
    .required(),
    raison:Joi.string()
    
    .min(30)
    .max(200)
    .required().trim(),
 
    Date_depot:Joi.date().format('YYYY-MM-DD').utc(),
  
})

let AvanceSchema=mongoose.Schema({
    decision:false,
    nomD:String,
    prenomD:String,
    Date_depot:String,
    etat:String,
    somme: Number,
    raison:String


});


 mongoose.models = {}
 var Avance = mongoose.model('avance', AvanceSchema);

 let url = 'mongodb://localhost:27017/rhDB'
 exports.testConnect=()=>{
     return new Promise((resolve,reject)=>{ 
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         mongoose.disconnect()
         resolve('connected zeda ')
         console.log('ccc')

     }).catch((err)=>reject(err))
    })
}



exports.PostNewAvance=(nomD,prenomD,Date_depot,etat,somme,raison)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       let v= schemaValidation.validate({nomD:nomD,prenomD:prenomD,Date_depot:Date_depot,etat:etat,somme:somme,raison:raison});
        if(v.error)
        {
            mongoose.disconnect()
            reject(v.error.details[0].message)
        }

       let avance=new Avance ({
        nomD:nomD,
        prenomD:prenomD,
        Date_depot:Date_depot,
        etat:etat,
        somme:somme,
        raison:raison,
        decision:false,
    
       })
       avance.save().then((doc)=>{
           mongoose.disconnect()
           resolve(doc)
       }).catch((err)=>{
        mongoose.disconnect
        reject(err)})

        
    }).catch((err)=>reject(err))
   })
}



exports.getAllAvances=()=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Avance.find()

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}




exports.getOneAvance=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Avance.findById(id)

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}


exports.deleteOneAvance=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Avance.deleteOne({_id:id})

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}



exports.updateOneAvance=(id,nomD,prenomD,Date_depot,etat,somme,raison,decision)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Avance.updateOne({_id:id},{
        nomD:nomD,
        prenomD:prenomD,
        Date_depot:Date_depot,
        etat:etat,
        somme:somme,
        raison:raison,
        decision:decision,
    
       })

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}
