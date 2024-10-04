const User = require("../model/User") ;
const OTP = require("../model/Otp") ;
const otpGenerator=require("otp-generator") ;
const bcrypt= require("bcrypt")
const Profile = require("../model/DatingProfile") ;
const jwt = require("jsonwebtoken") ;
const mailSender = require("../utils/mailSender");
require("dotenv").config()
const { OAuth2Client } = require('google-auth-library');
const {uploadImageToCloudinary} = require("../utils/imageUploader")


 
exports.sendOTP=async(req, res)=>{
    try {
        let {email}= req.body ;
        email = (email+"").toLowerCase()

        const checkUserPresent = await User.findOne({email:email}) ;

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User Already Exists"
        })
    }
    var otp = otpGenerator.generate(6 , {
        upperCaseAlphabets:false ,
        lowerCaseAlphabets:false ,
        specialChars:false
    }
    )


    let existing_otp = await OTP.findOne({otp:otp});
    while(existing_otp){
        otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false ,
            lowerCaseAlphabets:false ,
            specialChars:false
        }
        )
        existing_otp = await OTP.findOne({otp:otp});
     }
 
     const otpPayload={email , otp} ;
     const otpBody = await OTP.create(otpPayload)

     return res.status(200).json({
        success:true ,
        message:"OTP has been sent successfully" ,
        otp ,
     })
        
    } catch (error) {
        return res.status(500).json({
            success:false ,
            message:"Error While Sending Otp"
        })
        
    }
    
}
 
exports.signUp = async(req , res)=>{

    try {
        const {fullName  , password ,  otp}=req.body ;
        let {email}= req.body ;
        email = (email+"").toLowerCase()


        if(!fullName || !email  || !password  || !otp  ){
            return res.status(403).json({
                success:false ,
                message:"All fields are required"
            })
        }
    
       
        
    
        const existingUser = await  User.findOne({email:email})
        if(existingUser){
            return res.status(400).json({
                success:false ,
                message:"User is already registered"
            })
        }

    
        const recentOtp = await OTP.findOne({email:email}).sort({createdAt:-1}).limit(1) ;
        if(!recentOtp){
            return res.status(400).json({
                success:false ,
                message:"OTP Not Found"
            })
        } else if(otp!==recentOtp.otp){
          
            return res.status(400).json({
                success:false ,
                message:"OTP doesn't match"
            })
        }
        const hashedPassword = await  bcrypt.hash(password ,10) ;
        const profileDetails = await Profile.create({
            age :null, 
            gender:null ,
            dateOfBirth:null ,
            about:null ,
            sexualOrientation:null , 
            city:null ,
            state:null ,
            country:null ,
            instagram:null ,
            snapchat:null ,
            telegram:null ,
            imageUrl:null , 
        })
        const user = await User.create({
            name:fullName ,
            email:email.toLowerCase() ,
            password :hashedPassword ,
            datingProfile:profileDetails._id
           
        })

        const data = await Profile.findByIdAndUpdate(profileDetails , {user:user._id})

        
        
        return res.status(200).json({
            success:true ,
            message:"User is registered" ,
            user
        })


    } catch (error) {
        return res.status(400).json({
            success:true ,
            message:"Error while signing Up"
        })

        
    }
   


}

exports.login = async(req  , res)=>{
    try{
     const { password} = req.body ;
     let {email}= req.body ;
     email = (email+"").toLowerCase()
     if(!email || !password){
        return res.status(403).json({
            success:false ,
            message:"Credentials Needed"
        })

     }
     const existingUser = await User.findOne({email}) ;
     if(!existingUser){
        return res.status(403).json({
            success:false ,
            message:"User Doesn't exist"
        })
     }

     if(await bcrypt.compare(password , existingUser.password)){
        const payload = {
            email:existingUser.email ,
            id:existingUser._id ,
            accountType:existingUser.accountType
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn:"2h"

        })

        existingUser.token = token ;
        existingUser.password = undefined ;
        const options= {
            expires:new Date(Date.now() + 3*24*60*60*1000) ,
            httpOnly:true
        }
        res.cookie("cookie" , token , options).status(200).json({
            success:true ,
            token ,
            existingUser ,
            message:"Logged In Successfully"
        })
        
     } else{
        return res.status(400).json({
            success:false ,
            message:"Password is Invalid"
        })
     }

    }catch(err){
        return res.status(400).json({
            success:false ,
            message:"Couldn't Login"
        })
    }
}



const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 
const client = new OAuth2Client(CLIENT_ID);

exports.verifyGoogleToken = async (req, res) => {
    const { token } = req.body;
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const userEmail = payload['email'];
      const userName = payload['name']; 
  
      
      let existingUser = await User.findOne({ email: userEmail });
  
      if (!existingUser) {
        const profileDetails = await Profile.create({
            age :null, 
            gender:null ,
            dateOfBirth:null ,
            about:null ,
            contactNumber:null ,
            sexualOrientation:null , 
            city:null , 
            state:null ,
            country:null ,
            instagram:null ,
            snapchat:null ,
            telegram:null ,
            imageUrl:null , 
        })



        existingUser = new User({
          email: userEmail,
          name: userName, 
          datingProfile:profileDetails._id 
        });
  
        await existingUser.save();
      }
      const data = await Profile.findByIdAndUpdate(existingUser.datingProfile , {user:existingUser._id})

      existingUser = await User.findOne({ email: userEmail }).populate('datingProfile');
      existingUser.password=undefined
  
      const authToken = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
  
      return res.status(200).json({
        success: true,
        token: authToken,
        user:{name:existingUser.name ,email:existingUser.email  , ...existingUser.datingProfile} ,
        message: 'User authenticated successfully',
      });
  
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
  


  exports.getUser = async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!decoded ) {
            return res.status(404).json({
                success: false,
                message: "Authentication Failed. Kindly Log In."
            });
        }

        const id = req.user.userId || req.user.id;
        const user = await User.findById(id)
            .populate({
                path: 'playLists',
                populate: {
                    path: 'songs',
                    select: '-_id' 
                },
                select: '-_id' 
            })
            .populate({
                path: 'likedSongs', 
                select: '-_id'
            })
            .populate({
                path: 'datingProfile',
                select: '-_id' 
            })
            .populate({
                path:"history" ,
                select:"-_id"
            })
            .select('-_id -password') 
            .exec();

            



        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No such user exists."
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: "Couldn't fetch user data."
        });
    }
};



exports.updateProfile = async (req, res) => {
    try {
        const { gender, birthdate, sexualOrientation, instagram, snapchat, telegram, aboutMe, city, state, country } = req.body;

      

        if (!gender || !birthdate || !sexualOrientation || !instagram || !snapchat || !telegram || !aboutMe || !city || !state || !country) {
            return res.status(400).json({ success: false, message: "Found Empty Fields" });
        }

        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Authorization token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Invalid token" });

        const userId = decoded.userId || decoded.id;

      

        const datingProfile = await Profile.findOne({ user: userId }).populate('user');
        if (!datingProfile) return res.status(404).json({ message: "Dating profile not found" });


        datingProfile.gender = gender || datingProfile.gender;
        datingProfile.dateOfBirth = birthdate || datingProfile.dateOfBirth;
        datingProfile.sexualOrientation = sexualOrientation || datingProfile.sexualOrientation;
        datingProfile.instagram = instagram || datingProfile.instagram;
        datingProfile.snapchat = snapchat || datingProfile.snapchat;
        datingProfile.telegram = telegram || datingProfile.telegram;
        datingProfile.about = aboutMe || datingProfile.about;
        datingProfile.city = city || datingProfile.city;
        datingProfile.state = state || datingProfile.state;
        datingProfile.country = country || datingProfile.country;

        if (req.files && req.files.imageUrl) {
            const image = req.files.imageUrl; 
            const result = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
            datingProfile.imageUrl = result.secure_url;
        }

        await datingProfile.save();

        const updatedProfile = await Profile.findById(datingProfile._id).populate('user');
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {name:updatedProfile.user.name ,email:updatedProfile.user.email , ...datingProfile.toObject()  }, 
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Profile could not be updated" });
    }
};

exports.addLocation = async(req , res)=>{
    try{

        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const {lat , lon} = req.body ;
      
        if(!lat || !lon){
            return res.status(400).json({
                success:false ,
                message:"No Location Found"
            })
        }

        if (!decoded    ) {
            return res.status(404).json({
                success: false,
                message: "Authentication Failed. Kindly Log In."
            });
        }

        const id = req.user.userId || req.user.id;
        
        const user = await Profile.findOneAndUpdate(
            { user: id },
            {
                $set: {
                    lat: lat,
                    lon: lon
                }
            },
            { new: true }
        );

        if(!user){
            return res.status(200).json({
                success:false ,
                message:"Could't Find User"
            })
        }


        return res.status(200).json({
            success:true ,
            message:"Location Updated"
        })




    }catch(err){
        return res.status(500).json({
            success:false ,
            message:"Internal Server Error"
        })

    }
}



exports.fetchProfile = async(req , res)=>{
    try{

        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

      
       

        if (!decoded  ) {
            return res.status(404).json({
                success: false,
                message: "Authentication Failed. Kindly Log In."
            });
        }

        const id = req.user.userId || req.user.id;

        const data = await Profile.findOne({user:id})
                                                .populate({
                                                 path: "user",
                                                 model: "User",
                                                select: "name email",
                                                 })
                                                 .select("-lat -lon -_id"); 


        if(!data){
            return res.status(400).json({
                success:false ,
                message:"No Profile Found"
            })
        }


        return res.status(200).json({
            data:data ,
            success:true ,
            message:"Profile Fetched Successfully"
        })
        
       

    }catch(err){

        return res.status(500).json({
            success:true ,
            message:"Server Error"

        })
    }

}



exports.getLikedOrHistory = async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!decoded) {
            return res.status(404).json({
                success: false,
                message: "Authentication Failed. Kindly Log In."
            });
        }

        const userId = req.user.userId || req.user.id;

        const userData = await User.findById(userId)
            .populate({
                path: 'history',
                model: 'Song',
            })
            .populate({
                path: 'likedSongs',
                model: 'Song',
            })
            .exec();

        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "No user data found."
            });
        }

      

        return res.status(200).json({
            success: true,
            message: 'Liked Songs and History Fetched',
            data: {
                likedSongs: userData.likedSongs,
                history: userData.history,
            },
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching data",
            error: err.message,
        });
    }
};



exports.getPlaylists = async(req , res)=>{
    try{
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!decoded ) {
            return res.status(404).json({
                success: false,
                message: "Authentication Failed. Kindly Log In."
            });
        }

        const id = req.user.userId || req.user.id;
        const user = await User.findById(id)
            .populate({
                path: 'playLists',
                populate: {
                    path: 'songs',
                    select: '-_id' 
                },
                select: '-_id' 
            })

            if(!user){
                return res.status(400).json({
                    success:false ,
                    message:"No PlayList Found"
                })
            }

            return res.status(200).json({
                success:true ,
                message:"Playlist Returned Successfully",
                data:user
            })

    }catch(err){
        return res.status(500).json({
            success:false ,
            message:"Couldn't Get Playlist"
        })

    }
}





 



