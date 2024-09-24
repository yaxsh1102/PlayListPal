const User = require("../model/User")
const Song = require("../model/Song")
const jwt= require("jsonwebtoken")
const Playlist = require("../model/Playlist")



exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;

        const existingPlaylist = await Playlist.findOne({ name: name });
        if (existingPlaylist) {
            return res.status(400).json({
                success: false,
                message: "Playlist Already Exists"
            });
        }

        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.userId)
        console.log(decoded)
        if (!decoded) {
            console.log("hello")
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;

        // Create the new playlist
        const playList = await Playlist.create({
            name: name.toUpperCase(),
        });

        const userId = req.user.userId || req.user.id;
        console.log(userId)

        const data = await User.findByIdAndUpdate(userId, {
            $push: { playLists: playList._id }
        } , {new:true});
       
        console.log(data)
        return res.status(200).json({
            success: true,
            message: "Playlist Created Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Couldn't Create Playlist"
        });
    }
};


exports.addToPlaylist = async(req , res)=>{
    try{
        const{name , image , preview_url , singer , artist , playlistName} = req.body ;
        console.log(name , image , preview_url , singer , artist , playlistName)

      
        if(!name || !image || !preview_url || !singer || !artist){
            console.log(name , image , preview_url , singer , artist , playlistName)
            return res.status(400).json({
                success:false ,
                message:"Couldn't Add song due to missing parameter"
            })
        }

        let song = await Song.findOne({
            name:name ,
        })
        const data = await Playlist.findOne(
            { name: playlistName },
        );


        if(!song){

            song = await Song.create({
                name:name ,
                image:image , 
                preview_url:preview_url ,
                singer:singer , 
                artist:artist , 
                liked:false ,
                playlist:[playlistName] ,
                history:false 
        
            })


        }
        console.log(song)
        console.log(data)

        data.songs.push(song._id)
        await data.save()

        

    
    
      
    


     

        return res.status(200).json({
            success:true , 
            message:"Song Added Successfully"
        })
    

    }catch(err){
        console.log(err)

        return res.status(400).json({
            success:false , 
            message:"Couldn't Add Song"
        })

    }
  
}

exports.addToLiked = async(req , res)=>{
    try{
        const{name , image , preview_url , singer , artist} = req.body ;
        console.log(name , image , preview_url , singer , artist)
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const id = req.user.userId  || req.user.id;
        if(!name || !image || !preview_url || !singer || !artist){
            return res.status(400).json({
                success:false ,
                message:"Couldn't Add song due to missing parameter"
            })
        }

        let addSong = await Song.findOne({name:name})
    
        if(!addSong){
         addSong = await Song.create({
            name:name ,
            image:image , 
            preview_url:preview_url ,
            singer:singer , 
            artist:artist ,
            liked:true , 
            playlist:[] ,
            history:false ,
    
        })
    } else {
    addSong.liked=true ;
    await addSong.save() ;
    }

        console.log(addSong) 
    
        const dt = await User.findOneAndUpdate({_id:id} , {$push:{
            likedSongs:addSong._id , 
        }} ,{new:true}) 
        console.log(dt)


        return res.status(200).json({
            success:true , 
            message:"Song Added Successfully"
        })
    

    }catch(err){
        console.log(err)

        return res.status(400).json({
            success:false , 
            message:"Couldn't Add Song"
        })

    }
  
}

exports.removeFromLiked = async(req , res)=>{
    try{
        const{name} = req.body ;
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const id = req.user.userId || req.user.id  ;
        if(!name ){
            return res.status(400).json({
                success:false ,
                message:"Couldn't Remove Song"
            })
        }

        const song = await Song.findOne({ name: name });

        if (!song) {
            return res.status(400).json({
                success: false,
                message: "Couldn't find the song to remove"
            });
        }

        song.liked = false;
        await song.save();

        // if (song.playlist.length === 0 && !song.history) {
        //     await Song.deleteOne({ _id: song._id });
        // }
        console.log(song._id + '122122')
       ;

         

            const result = await User.findOneAndUpdate(
                { _id: id },
                { $pull: { likedSongs: song._id } },
                { new: true }
            );

          



        

       

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Couldn't update user information"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Song removed successfully",
            user: result
        });
    
      

    }catch(err){
        console.log(err)

        return res.status(400).json({
            success:false , 
            message:"Couldn't Remove Song"
        })

    }
  
}


exports.removeFromPlaylist = async(req , res)=>{
    try{
        const{name , playlistName} = req.body ;
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
 
        const id = req.user.userId  ;
        if(!name ){
            return res.status(400).json({
                success:false ,
                message:"Couldn't Remove Song"
            })
        }

        const song = await Song.findOne({ name: name });
        if(!song || song.playlist.length==0){
            return res.status(400).json({
                success:false ,
                message: !song ? ("No Song Found") :("No Playlist Found")
            })
        }

        if(!song.playlist.includes(playlistName)){
            return res.status(403).json({
                success:false ,
                message:"No Playlist Found"
            })

        }

        song.playlist = song.playlist.filter((song)=>song!==playlistName) ;

      



        

 
        const playlist = await Playlist.findOne({name:playlistName})
        console.log(playlist)
        playlist.songs = playlist.songs.filter((elem)=>elem && !elem.equals(song._id))
        await playlist.save()


       

     

        if (song.playlist.length === 0 && !song.liked && !song.history) {
            await Song.deleteOne({ _id: song._id });
        }

      

        return res.status(200).json({
            success: true,
            message: "Song removed successfully",
        });
    
      

    }catch(err){
        console.log(err)

        return res.status(400).json({
            success:false , 
            message:"Couldn't Remove Song"
        })

    }
  
}



exports.deletePlaylist = async (req, res) => { 
    try {
        const { name } = req.body;
        console.log(name)
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
    
        const userId = req.user.userId;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "No Playlist name found"
            });
        }

        const playlistToDelete = await Playlist.findOne({ name: name });
       console.log(playlistToDelete)

        if (!playlistToDelete) {
            return res.status(400).json({
                success: false,
                message: "No Playlist Found"
            });
        }
        await Playlist.deleteOne({ _id: playlistToDelete._id });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.playLists = user.playLists.filter((playlistId) => !playlistId.equals(playlistToDelete._id));
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Playlist Deleted Successfully",
            deletedPlaylistId: playlistToDelete._id 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting the playlist"
        });
    }
};

exports.renamePlaylist= async (req, res) => {
    try {
        const { oldName, newName } = req.body;
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const userId = req.user.userId; 


        if (!oldName || !newName) {
            return res.status(400).json({
                success: false,
                message: "Old name or new name not provided"
            });
        }

        const playlist = await Playlist.findOne({ name: oldName });


        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }

        playlist.name = newName.toUpperCase();
        await playlist.save();


        await Song.updateMany(
            { playlist: oldName.toUpperCase() },
            { $set: { "playlist.$": newName.toUpperCase() } }
        );
        console.log("hii")


        return res.status(200).json({
            success: true,
            message: "Playlist renamed successfully",
            renamedPlaylist: playlist
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error renaming the playlist"
        });
    }
};


exports.addToHistory = async(req , res)=>{
    try{
        const{name , image , preview_url , singer , artist} = req.body ;
        console.log(name , image , preview_url , singer , artist)
        console.log(singer)
        if (!name || !image || !preview_url || !singer || !artist) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }
        
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const id = req.user.userId || req.user.id ;

        let song = await Song.findOne({name:name}) ;
        const user = await User.findById(id) ;
        console.log(song)


        if(!song){
            try {
                 song = new Song({ history:true, liked:false, artist, singer, preview_url, image, name });
                await song.save();
                console.log(song)
                user.history.unshift(song._id) ;
                user.save()
                return res.status(200).json({
                    success:true ,
                    message:"History Updated Successfully"

                })


              } catch (error) {
                return res.status(500).json({ message: error.message });
              }
        } else{

        
        if(song.history){
        user.history = user.history.filter(songId => !songId.equals(song._id));
        user.history.unshift(song._id);
           
        } else{
            user.history.unshift(song._id) ;
        }





        await song.save() ;
        await user.save() ;
     }
        if (user.history.length > 11) {
           const song =  user.history.pop(); 
           if(song.playlists.length==0 && !song.liked){
            await Song.findByIdAndDelete(song._id) ;
            
           }
        }


        return res.status(200).json({
            success:true ,
            message:"History Updated"
        })





    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false ,
            message:"Couldn't Update History"
        })
    }
}




