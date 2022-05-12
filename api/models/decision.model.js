const mongoose = require('mongoose')
//const Joi = require('joi')
const Joi = require('joi')
    .extend(require('@joi/date'));
require('dotenv').config()


const schemaValidation = Joi.object({
   
    type_D: Joi.string()
    .required(),
    cause_D:Joi.string()
    
    .min(30)
    .max(200)
    .required().trim(),
 
    Date_D:Joi.date().format('YYYY-MM-DD').utc(),
  
})

let decisionSchema=mongoose.Schema({
    Date_D:String,
    type_D: String,
    cause_D:String


});


 mongoose.models = {}
 var Decision = mongoose.model('decision', decisionSchema);

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



exports.PostNewdecision=(Date_D,type_D,cause_D)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       let v= schemaValidation.validate({Date_D:Date_D,type_D:type_D,cause_D:cause_D});
        if(v.error)
        {
            mongoose.disconnect()
            reject(v.error.details[0].message)
        }

       let decision=new Decision ({
        Date_D:Date_D,
        type_D:type_D,
        cause_D:cause_D
    
       })
       decision.save().then((doc)=>{
           mongoose.disconnect()
           resolve(doc)
       }).catch((err)=>{
        mongoose.disconnect
        reject(err)})

        
    }).catch((err)=>reject(err))
   })
}



exports.getAlldecisions=()=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Decision.find()

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}




exports.getOnedecision=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Decision.findById(id)

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}


exports.deleteOnedecision=(id)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Decision.deleteOne({_id:id})

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}



exports.updateOnedecision=(id,Date_D,type_D,cause_D)=>{
    return new Promise((resolve,reject)=>{ 
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    return  Decision.updateOne({_id:id},{
        Date_D:Date_D,
        type_D:type_D,
        cause_D:cause_D
    
    
       })

    }).then((doc)=>{
        mongoose.disconnect
        resolve(doc)

    }).catch((err)=>{
        mongoose.disconnect
        reject(err)})
   })
}
