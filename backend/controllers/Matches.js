const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User"); 
const haversineDistance = require("../utils/haversineDistance")



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
        const {likedSongs , playLists , radius } = req.body ;
 

        const user = await User.findById(id)
        .populate('playLists')  
        .populate({
            path: 'datingProfile', 
            select: 'lat lon gender sexualOrientation'  
        })
        .select('playLists likedSongs datingProfile name friends interactedUser requests')  
        .exec(); 
     

        const allUsers = await User.find({ _id: { $ne: id } })
        .populate('playLists')
        .populate({
          path: 'datingProfile',
          select: '-instagram -telegram -snapchat -_id -lat -lon',
        })
        .select('playLists likedSongs datingProfile name friends requests')
        .exec();
      
    
         let resultUser=[] ; 

        for (const person of allUsers) {
            if (person.datingProfile.sexualOrientation !== user.datingProfile.sexualOrientation) continue;
        
            if (person.datingProfile.sexualOrientation === 'Homosexual' && person.datingProfile.gender !== user.datingProfile.gender) continue;
        
            if (person.datingProfile.sexualOrientation !== 'Homosexual' && person.datingProfile.gender === user.datingProfile.gender) continue;
        
            const distance = haversineDistance(
                user.datingProfile.lat, user.datingProfile.lon,
                person.datingProfile.lat, person.datingProfile.lon
            );
            if (distance > radius) continue;
        
            if (user.friends.includes(person._id) || user.interactedUser.includes(person._id) || user.requests.includes(person._id)) continue;
        
            let intersectionLikedSongs = [];
            if (likedSongs) {
                intersectionLikedSongs = person.likedSongs.filter(song => user.likedSongs.includes(song));
            }
        
            let playListSongs = 0;
            const userPlaylist = [];
            const personPlaylist = [];
        
            if (playLists) {
                if (person.playLists) {
                    person.playLists.forEach(playlist => {
                        playlist.songs.forEach(song => {
                            const songIdStr = song._id.toString();
                            if (!intersectionLikedSongs.includes(songIdStr)) {
                                personPlaylist.push(songIdStr);
                            }
                        });
                    });
                }
        
                if (user.playLists) {
                    user.playLists.forEach(playlist => {
                        playlist.songs.forEach(song => {
                            const songIdStr = song._id.toString();
                            if (!intersectionLikedSongs.includes(songIdStr)) {
                                playListSongs += 1;
                                userPlaylist.push(songIdStr);
                            }
                        });
                    });
                }
        
                const intersectionPlaylist = userPlaylist.filter(songId => personPlaylist.includes(songId));
                person.percentage = ((intersectionPlaylist.length + intersectionLikedSongs.length) / (user.likedSongs.length + playListSongs)) * 100;
            }
        
            if (person.percentage && person.percentage >= 1) {
                const data = {
                    _id: person._id,
                    name: person.name,
                    dateOfBirth: person.datingProfile.dateOfBirth,
                    gender: person.datingProfile.gender,
                    sexualOrientation: person.datingProfile.sexualOrientation,
                    city: person.datingProfile.city,
                    state: person.datingProfile.state,
                    about: person.datingProfile.about,
                    imageUrl: person.datingProfile.imageUrl
                };
        
                resultUser.push(data);
        
                if (!user.interactedUser.includes(person._id)) {
                    user.interactedUser.push(person._id);
                }
            }
        }
        await user.save(); 
        
        

        return res.status(200).json({
            success:true ,
            message:"Matches Fetched" ,
            data:resultUser
        })
        



    } catch (error) {
        return res.status(400).json({
            success:false ,
            message:"Couldnt Find match"
        })
        
    }
}







exports.sendRequest=async(req , res)=>{
    try{
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
        const {reqReceiverId} = req.body ;

        const reqReceiver = await User.findById(reqReceiverId) 


        if(!reqReceiver){
            return res.status(400).json({
                success:false ,
                message:"No Such User Exists"
            })
        }

        if(reqReceiver.requests.includes(id)){
            return res.status(400).json({
                success:false ,
                message:"Request Already Exist"
            })

        }

        const resp =  reqReceiver.requests.push(id) ;
        const data = await reqReceiver.save()  ;

        return res.status(200).json({
            success:true ,
            message:"Request Sent Successfully"

        })






    }catch(err){
        return res.status(500).json({
            success:false ,
            message:"Internal Server Error"
        })

    }


}

exports.rejectRequest = async(req , res)=>{
    try{
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

        const {reqSenderId} = req.body;
        if(!reqSenderId){
            return res.status(400).json({
                success:false ,
                message:"Missing Parameters"
            })
        }

        const updatedRequests = await User.findByIdAndUpdate(id , {
            $pull:{
                requests:reqSenderId
            } ,
            $push:{
                interactedUser:reqSenderId
            }

        } ,{new:true})

        if(!updatedRequests){
            return res.status(400).json({
                success:false ,
                message:"No Request Found"
            })
        }

        return res.status(200).json({
            success:true ,
            message:"Request Rejected Successfully" ,
            newRequests:updatedRequests.requests
        })



       }catch(err){

        return res.status(400).json({
        success:false ,
        message:"Internal Server Error"
        })

    }
    
}


exports.acceptRequest = async(req , res)=>{
    try{

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

        const {reqSenderId} = req.body;
        if(!reqSenderId){
            return res.status(400).json({
                success:false ,
                message:"Missing Parameters"
            })
        }
        const updatedSender= await User.findByIdAndUpdate(
            reqSenderId,
            {
              $pull: { requests: id },  
              $push: { friends: id }     
            },

          )


          if(!updatedSender){
            return res.status(400).json({
                success:false ,
                message:"Couldn't Find User"

            })
            
          }

          
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
              $pull: { requests: reqSenderId },  
              $push: { friends: reqSenderId , interactedUser:reqSenderId }     
            },
            { new: true }  
          )
          .populate({
            path: 'friends',
            select: '-password -email -contactNumber',
            populate: {
            path: 'datingProfile',
            model: 'Profile' ,
            select :'-lat -lon'
            }
        })

         

          return res.status(200).json({
            friends:updatedUser.friends,
            success:true ,
            message:"Request Accepted"
          })
           




    }catch(err){
        return res.status(400).json({
            success:false ,
            message:"Internal Server Error"
        })

    }
}
exports.removeFriend= async(req , res)=>{
    try{

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
        const {friendId} = req.body ;

        const updateFriend = await User.findByIdAndUpdate(friendId , {
            $pull:{
                friends:id
            }

        } , {new:true})

        if(!updateFriend){
            return res.status(400).json({
                success:false ,
                message:"couldn't Find User" 
            })
        }

        const updatedUser = await User.findByIdAndUpdate(id ,{
            $pull:{
                friends:friendId
            }
        } , {new:true})
        .populate({
            path: 'friends',
            select: '-password -email -contactNumber',
            populate: {
            path: 'datingProfile',
            model: 'Profile' ,
            select :'-instagram -telegram -snapchat -lat -lon'
            }
        })





        return res.status(200).json({
            success:true ,
            messsage:"Friend Removed Successfully" ,
            friends:updatedUser.friends
        })

      }catch(err){
        return res.status(500).json({
            success:false ,
            message:"Internal Server Error"
        })
    }


}


exports.getDetails=async(req , res)=>{
    try{

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

            const data = await User.findById(id)
            .populate({
                path: 'friends',
                select: '-password -email -password -playLists -history -friends -requests -likedSongs',
                populate: {
                path: 'datingProfile',
                model: 'Profile' ,
                select :'-lat -lon'
                }
            })
            .populate({
                path: 'requests',
                select: '-password -email -password -playLists -history -friends -requests -likedSongs',
                populate: {
                path: 'datingProfile',
                model: 'Profile' ,
                select :'-lat -lon'

                }
            })
            .select('-password -playLists -history -friends -requests -likedSongs')
            .lean()
            .exec();
            if(!data){
                return res.status(400).json({
                    success:false ,
                    message:"User Doesn't Exist"
                })
            }


            return res.status(200).json({
                success:true ,
                message:"Details Fetched Successfully",
                requests:data.requests ,
                friends:data.friends
            })

   }catch(err){
        return res.status(500).json({
            success:false ,
            message:"Internal Server Error"
        })

    }
}

