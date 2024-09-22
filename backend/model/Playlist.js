const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true 
    } , 
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"Song"
        }
    ] 
}) 

module.exports = mongoose.model("Playlist" , PlaylistSchema)