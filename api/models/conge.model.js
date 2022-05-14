const mongoose = require('mongoose')
//const Joi = require('joi')
const Joi = require('joi')
    .extend(require('@joi/date'));
require('dotenv').config()


const schemaValidation = Joi.object({
    decision:Joi.boolean(),
    etat: Joi.string()
    .required(),
    nomD: Joi.string()
    .required(),
    prenomD: Joi.string()
    .required(),
    typeConge:Joi.string()
    
    .min(3)
    .max(20)
    .required().trim(),
    nombre_jour:Joi.number().required(),
 
    Date_depot:Joi.date().format('YYYY-MM-DD').utc(),
    date_d:Joi.date().format('YYYY-MM-DD').utc()
  
})

let CongeSchema=mongoose.Schema({
    decision:false,
    nomD:String,
    prenomD:String,
    Date_depot:String,
    etat:String,
    date_d: String,
    nombre_jour:Number,
    typeConge:String,
    


});


 mongoose.models = {}
 var Conge = mongoose.model('conge', CongeSchema);

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



exports.PostNewconge=(nomD,prenomD,Date_depot,etat,date_d,nombre_jour,typeConge)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       let v= schemaValidation.validate({nomD:nomD,prenomD:prenomD,Date_depot:Date_depot,etat:etat,date_d:date_d,nombre_jour:nombre_jour,typeConge:typeConge});
        if(v.error)
        {
            mongoose.disconnect()
            reject(v.error.details[0].message)
        }

       let conge=new Conge ({
        nomD:nomD,
        prenomD:prenomD,
        Date_depot:Date_depot,
        etat:etat,
        date_d:date_d,
        nombre_jour:nombre_jour,
        typeConge:typeConge,
        decision:false,
       })
       conge.save().then((doc)=>{
           mongoose.disconnect()
           resolve(doc)
       }).catch((err)=>{
        mongoose.disconnect
        reject(err)})

        
    }).catch((err)=>reject(err))
   })
}



exports.getAllconges=()=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Conge.find()

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}




exports.getOneconge=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Conge.findById(id)

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}


exports.deleteOneconge=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Conge.deleteOne({_id:id})

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}



exports.updateOneconge=(id,nomD,prenomD,Date_depot,etat,date_d,nombre_jour,typeConge,decision)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Conge.updateOne({_id:id},{
        nomD:nomD,
        prenomD:prenomD,
        Date_depot:Date_depot,
        etat:etat,
        date_d:date_d,
        nombre_jour:nombre_jour,
        typeConge:typeConge,
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
