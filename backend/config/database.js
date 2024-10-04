const mongoose = require("mongoose")

require("dotenv").config()

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser:true , 
        useUnifiedTopology:true ,
        minPoolSize:10
    }).then(()=>console.log("Connected to Database"))
      .catch((e)=>console.log(e))
}