const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true , 
    } ,
    image:{
        type:String , 
        required:true , 
    }
     ,
     preview_url:{
        type:String , 
        required:true , 
    } ,
    singer:{
        type:String , 
        required:true 
    } ,
    artist:{
        type:String , 
        required:true  
    } ,
    
})

module.exports= mongoose.model("Song" ,songSchema )