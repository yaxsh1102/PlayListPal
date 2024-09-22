const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // Ensure this is imported if you're using jwt
const User = require("../model/User"); // Ensure the paimport SexualOrientation from './../../../musify/mann/src/components/SexualOrientation';




exports.getMatches = async(req , res)=>{
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        const id = req.user.id || req.user.userId ;
        const {likedSongs , playLists , radius} = req.body ;
 

        const user = await User.findById(id)
        .populate('playLists')  
        .populate({
            path: 'datingProfile', 
            select: 'lat lon gender'  
        })
        .select('playLists likedSongs datingProfile name')  
        .exec(); 
     
        console.log(user)

        const allUsers = await User.find({ _id: { $ne: id } })
        .populate('playLists')
        .populate({
          path: 'datingProfile',
          select: '-instagram -telegram -snapchat -_id',
        })
        .select('playLists likedSongs datingProfile name')
        .exec();
      
    
         let resultUser=[] ; 
         allUsers.forEach(person => {
            // if (person.datingProfile.gender === user.datingProfile.gender) {
            //     return false;
            // }

          
            const distance = haversineDistance(
                user.datingProfile.lat, user.datingProfile.lon,
                person.datingProfile.lat, person.datingProfile.lon
            );
            console.log(distance , person.name)
            if (distance > radius) {
                return false;
            }
            let intersectionLikedSongs ;
            console.log(person.likedSongs)
            console.log(user.likedSongs)
        
            if (likedSongs) {
                 intersectionLikedSongs = person.likedSongs.filter(song => user.likedSongs.includes(song));
            }

            console.log(intersectionLikedSongs.length + '1111111111111111')
        
                const userPlaylist = [];
                const personPlaylist = [];
                
                if (playLists) {
                    const personPlaylist = [];
                    const userPlaylist = [];
                    let playListSongs = 0;
                
                    // Populate personPlaylist with unique song IDs
                    if (person.playLists) {
                        person.playLists.forEach(playlist => {
                            playlist.songs.forEach(song => {
                                const songIdStr = song._id.toString(); // Convert ObjectId to string
                                if (!intersectionLikedSongs.includes(songIdStr)) {
                                    personPlaylist.push(songIdStr);
                                }
                            });
                        });
                    }
                
                    // Populate userPlaylist with unique song IDs and count playListSongs
                    if (user.playLists) {
                        user.playLists.forEach(playlist => {
                            playlist.songs.forEach(song => {
                                const songIdStr = song._id.toString(); // Convert ObjectId to string
                                if (!intersectionLikedSongs.includes(songIdStr)) {
                                    playListSongs += 1;
                                    userPlaylist.push(songIdStr);
                                }
                            });
                        });
                    }
                
                    // Find intersection of song IDs between user and person playlists
                    const intersectionPlaylist = userPlaylist.filter(songId => personPlaylist.includes(songId));
                
                    // Calculate percentage
                    person.percentage = ((intersectionPlaylist.length + intersectionLikedSongs.length) / (user.likedSongs.length + playListSongs)) * 100;
                
                    console.log(person.name, person.percentage);
                }
                
          

         if( person.percentage && person.percentage>=1) {
            const data = {
            _id: person._id,
            name:person.name ,
            age:person.datingProfile.age ,
            gender:person.datingProfile.gender ,
            sexualOrientation :person.datingProfile.sexualOrientation , 
            city:person.datingProfile.city ,
            state:person.datingProfile.state ,
            about:person.datingProfile.about
        }


            resultUser.push(data)
            return true
         } else {
            return false 
         }
        
        });
        

        return res.status(200).json({
            success:true ,
            message:"hello" ,
            data:resultUser
        })
        



    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false ,
            message:"Couldnt Find match"
        })
        
    }
}


function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * Math.PI / 180;
    
    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}
