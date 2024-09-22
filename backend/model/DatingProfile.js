const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    age:{
        type:Number , 
    } ,
    sexualOrientation:{
        type:String , 

    },

    imageUrl:{
        type:String ,
    } ,
    dateOfBirth:{
        type:String , 

    } ,
    gender:{
        type:String , 
    } , 
    about:{
        type:String , 
    } ,
    city:{
        type:String , 
    } ,
    state:{
        type:String , 
    } , 
    country:{
        type:String
    },
    instagram:{
        type:String , 
        
    } ,
    snapchat:{
        type:String ,
    }  ,
    telegram:{
        type:String  ,
    } ,
    lat:{
        type:String , 

    } ,
    lon:{
        type:String ,
    }

})

module.exports = mongoose.model("Profile" , ProfileSchema)