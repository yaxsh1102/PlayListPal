const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name:{
        type:String , 
    }, 
    password:{
        type:String , 
    } ,
    email:{
        type:String , 
    } ,
    contactNumber:{
        type:String , 
    } ,
    datingProfile :{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Profile" ,
    } ,
    playLists:[
        {
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Playlist"
        
        }
    ] ,
    likedSongs:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:"Song"
        }
    ] ,
    history:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:"Song"
        }
       
    ] ,

    requests:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"User"
        }
    ] ,
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"User"
        }
    ]
    
})

module.exports = mongoose.model("User" ,UserSchema )