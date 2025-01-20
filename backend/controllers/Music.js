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
      
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;

        const playList = await Playlist.create({
            name: name.toUpperCase(),
        });

        const userId = req.user.userId || req.user.id;

        const data = await User.findByIdAndUpdate(userId, {
            $push: { playLists: playList._id }
        } , {new:true});
       
        return res.status(200).json({
            success: true,
            message: "Playlist Created Successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Couldn't Create Playlist"
        });
    }
};


exports.addToPlaylist = async (req, res) => {
    try {
        const { name, image, preview_url, singer, artist, playlistName } = req.body;

        if (!name || !image || !preview_url || !singer || !artist || !playlistName) {
            return res.status(400).json({
                success: false,
                message: "Couldn't Add song due to missing parameter"
            });
        }

        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;

        const userId = req.user.userId || req.user.id;

        let song = await Song.findOne({ name: name });
        if (!song) {
            song = await Song.create({
                name, image, preview_url, singer, artist,
                liked: false,
                history: false
            });
        }

        let playlist = await Playlist.findOne({ name: playlistName.toUpperCase() });
        if (!playlist) {
            playlist = new Playlist({
                name: playlistName.toUpperCase(),
                songs: [song._id]
            });
        } else {
            if (!playlist.songs.includes(song._id)) {
                playlist.songs.push(song._id);
            }
        }

        await playlist.save();

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { playLists: playlist._id } }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Song and Playlist added successfully"
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Couldn't Add Song",
            error: err.message
        });
    }
};


exports.addToLiked = async(req , res)=>{
    try{
        const{name , image , preview_url , singer , artist} = req.body ;
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
    
        })
    } else {
    await addSong.save() ;
    }

    
        const dt = await User.findOneAndUpdate({_id:id} , {$push:{
            likedSongs:addSong._id , 
        }} ,{new:true}) 


        return res.status(200).json({
            success:true , 
            message:"Song Added Successfully"
        })
    

    }catch(err){

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
        if(!song ){
            return res.status(400).json({
                success:false ,
                message:  ("No Song Found")
            })
        }

        const playlist = await Playlist.findOne({name:playlistName})
        playlist.songs = playlist.songs.filter((elem)=>elem && !elem.equals(song._id))
        await playlist.save()


        return res.status(200).json({
            success: true,
            message: "Song removed successfully",
        });
    
      

    }catch(err){

        return res.status(400).json({
            success:false , 
            message:"Couldn't Remove Song"
        })

    }
  
}



exports.deletePlaylist = async (req, res) => { 
    try {
        const { name } = req.body;
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    
        const userId = req.user.userId || req.user.id;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "No Playlist name found"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const playlistToDelete = await Playlist.findOne({ name: name });

        if (!playlistToDelete) {
            return res.status(400).json({
                success: false,
                message: "No Playlist Found"
            });
        }
        await Playlist.deleteOne({ _id: playlistToDelete._id });

       

        user.playLists = user.playLists.filter((playlistId) => !playlistId.equals(playlistToDelete._id));
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Playlist Deleted Successfully",
            deletedPlaylistId: playlistToDelete._id 
        });

    } catch (error) {
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


       


        return res.status(200).json({
            success: true,
            message: "Playlist renamed successfully",
            renamedPlaylist: playlist
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error renaming the playlist"
        });
    }
};


exports.addToHistory = async(req , res)=>{
    try{
        const{name , image , preview_url  , singer , artist} = req.body ;
        console.log({name , image , preview_url  , singer , artist})
      
        if (!name || !image || !preview_url  ||!singer ||  !artist) {
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
        


        if(!song){
            try {
                 song = new Song({ artist, singer, preview_url, image, name });
                await song.save();
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

        
            const songIndex = user.history.findIndex(songId => songId.equals(song._id));

            if (songIndex !== -1) {
                user.history.splice(songIndex, 1); 
            }
            
            user.history.unshift(song._id);


            if (user.history.length > 11) {
                const song =  user.history.pop(); 
                
             }





        await song.save() ;
        await user.save() ;
     }
        


        return res.status(200).json({
            success:true ,
            message:"History Updated"
        })





    }catch(err){
        return res.status(400).json({
            success:false ,
            message:"Couldn't Update History"
        })
    }
}




