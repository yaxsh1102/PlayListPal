const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User"); 
const haversineDistance = require("../utils/haversineDistance")
const isProfileComplete = require("../utils/profileChecker")


exports.getMatches = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Authorization token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Invalid token" });

        req.user = decoded;
        const id = req.user.id || req.user.userId;
        const { likedSongs, playLists, radius } = req.body;

        const user = await User.findById(id)
            .populate('playLists')
            .populate({
                path: 'datingProfile',
                select: 'lat lon gender sexualOrientation dateOfBirth imageUrl about city state'
            })
            .select('playLists likedSongs datingProfile name friends requests')
            .exec();

        if (!user.datingProfile || !isProfileComplete(user.datingProfile)) {
            return res.status(400).json({
                success: false,
                message: "Your profile is incomplete. Please complete it to find matches."
            });
        }

        const allUsers = await User.find({ _id: { $ne: id } })
            .populate('playLists')
            .populate({
                path: 'datingProfile',
                select: '-instagram -telegram -snapchat -_id'
            })
            .select('playLists likedSongs datingProfile name friends requests')
            .exec();

        let resultUser = [];

        for (const person of allUsers) {
            if (!person.datingProfile || !isProfileComplete(person.datingProfile)) continue;

            if (person.datingProfile.sexualOrientation !== user.datingProfile.sexualOrientation) continue;
            if (person.datingProfile.sexualOrientation === 'Homosexual' && person.datingProfile.gender !== user.datingProfile.gender) continue;
            if (person.datingProfile.sexualOrientation !== 'Homosexual' && person.datingProfile.gender === user.datingProfile.gender) continue;

            const distance = haversineDistance(
                user.datingProfile.lat, user.datingProfile.lon,
                person.datingProfile.lat, person.datingProfile.lon
            );

            if (distance > radius) continue;
            if (user.friends.includes(person._id) || user.requests.includes(person._id)) continue;

            let intersectionLikedSongs = [];
            let totalLikedSongs = 0;

            if (likedSongs) {
                intersectionLikedSongs = person.likedSongs.filter(song => user.likedSongs.includes(song));
                totalLikedSongs = user.likedSongs.length;
            }

            let intersectionPlaylist = [];
            let totalPlaylistSongs = 0;

            if (playLists) {
                const userPlaylistSongs = new Set();
                const personPlaylistSongs = new Set();

                user.playLists?.forEach(playlist => {
                    playlist.songs.forEach(song => userPlaylistSongs.add(song._id.toString()));
                });

                person.playLists?.forEach(playlist => {
                    playlist.songs.forEach(song => personPlaylistSongs.add(song._id.toString()));
                });

                intersectionPlaylist = [...userPlaylistSongs].filter(song => personPlaylistSongs.has(song));
                totalPlaylistSongs = userPlaylistSongs.size;
            }

            let percentage = 0;
            if (likedSongs && !playLists) {
                percentage = (intersectionLikedSongs.length / (totalLikedSongs || 1)) * 100;
            } else if (!likedSongs && playLists) {
                percentage = (intersectionPlaylist.length / (totalPlaylistSongs || 1)) * 100;
            } else if (likedSongs && playLists) {
                const totalSongsConsidered = totalLikedSongs + totalPlaylistSongs;
                percentage = ((intersectionLikedSongs.length + intersectionPlaylist.length) / (totalSongsConsidered || 1)) * 100;
            }

            if (percentage >= 1) {
                resultUser.push({
                    _id: person._id,
                    name: person.name,
                    dateOfBirth: person.datingProfile.dateOfBirth,
                    gender: person.datingProfile.gender,
                    sexualOrientation: person.datingProfile.sexualOrientation,
                    city: person.datingProfile.city,
                    state: person.datingProfile.state,
                    about: person.datingProfile.about,
                    imageUrl: person.datingProfile.imageUrl
                });
            }
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Matches Fetched",
            data: resultUser
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Couldn't find a match"
        });
    }
};








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
        .populate({
            path: 'requests',
            select: '-password -email -password -playLists -history -friends -requests -likedSongs',
            populate: {
            path: 'datingProfile',
            model: 'Profile' ,
            select :'-lat -lon'

            }
        })

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
        .populate({
            path: 'requests',
            select: '-password -email -password -playLists -history -friends -requests -likedSongs',
            populate: {
            path: 'datingProfile',
            model: 'Profile' ,
            select :'-lat -lon'

            }
        })




         

          return res.status(200).json({
            friends:updatedUser.friends,
            requests:updatedUser.requests,
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
            select :' -lat -lon'
            }
        })
       





        return res.status(200).json({
            success:true ,
            messsage:"Friend Removed Successfully" ,
            friends:updatedUser.friends ,
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

