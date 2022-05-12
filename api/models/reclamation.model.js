const mongoose = require('mongoose')
//const Joi = require('joi')
const Joi = require('joi')
    .extend(require('@joi/date'));
require('dotenv').config()


const schemaValidation = Joi.object({
    type_R:Joi.string()
    .required(),
    etat: Joi.string()
    .required(),
    text_R:Joi.string()
    
    .min(30)
    .max(200)
    .required().trim(),
 
    Date_depot:Joi.date().format('YYYY-MM-DD').utc(),
  
})

let reclamationSchema=mongoose.Schema({
    Date_depot:String,
    etat:String,
    type_R: String,
    text_R:String


});


 mongoose.models = {}
 var Reclamation = mongoose.model('reclamation', reclamationSchema);

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
//Date_depot:String,
//etat:String,
//type_R: String,
//text_R:String


exports.PostNewReclamation=(Date_depot,etat,type_R,text_R)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       let v= schemaValidation.validate({Date_depot:Date_depot,etat:etat,type_R:type_R,text_R:text_R});
        if(v.error)
        {
            mongoose.disconnect()
            reject(v.error.details[0].message)
        }

       let reclamation=new Reclamation ({
        Date_depot:Date_depot,
        etat:etat,
        type_R:type_R,
        text_R:text_R
    
       })
       reclamation.save().then((doc)=>{
           mongoose.disconnect()
           resolve(doc)
       }).catch((err)=>{
        mongoose.disconnect
        reject(err)})

        
    }).catch((err)=>reject(err))
   })
}



exports.getAllReclamations=()=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Reclamation.find()

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}




exports.getOneReclamation=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Reclamation.findById(id)

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}


exports.deleteOneReclamation=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Reclamation.deleteOne({_id:id})

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}



exports.updateOneReclamation=(id,Date_depot,etat,type_R,text_R)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Reclamation.updateOne({_id:id},{
        Date_depot:Date_depot,
        etat:etat,
        type_R:type_R,
        text_R:text_R
    
       })

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}