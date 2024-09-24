const User = require("../model/User") ;
const OTP = require("../model/Otp") ;
const otpGenerator=require("otp-generator") ;
const bcrypt= require("bcrypt")
const Profile = require("../model/DatingProfile") ;
const jwt = require("jsonwebtoken") ;
const mailSender = require("../utils/mailSender");
require("dotenv").config()
const { OAuth2Client } = require('google-auth-library');

 
exports.sendOTP=async(req, res)=>{
    try {
        const {email }= req.body ;

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
    console.log("OTP generated : " , otp)


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
     console.log(otpBody)

     return res.status(200).json({
        success:true ,
        message:"OTP has been sent successfully" ,
        otp ,
     })
        
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            success:false ,
            message:"Error While Sending Otp"
        })
        
    }
    
}
 
exports.signUp = async(req , res)=>{

    try {
        const {name , email , password , confirmPassword  ,contactNumber , otp}=req.body ;
        console.log(email)

        if(!name || !email  || !password || !confirmPassword || !otp || !contactNumber ){
            return res.status(403).json({
                success:false ,
                message:"All fields are required"
            })
        }
    
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false ,
                message:"Password and confirm-password value doens't match"
            })
    
        }
    
        const existingUser = await  User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false ,
                message:"User is already registered"
            })
        }
        console.log("reached here" , email)
    
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1) ;
        console.log(recentOtp)
        if(!recentOtp){
            return res.status(400).json({
                success:false ,
                message:"OTP Not Found"
            })
        } else if(otp!==recentOtp.otp){
            console.log(recentOtp.otp)
            console.log(otp)
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
        const user = await User.create({
            name ,
            email ,
            password :hashedPassword ,
            contactNumber , 
            datingProfile:profileDetails._id
           
        })

        req.user = {
            name , 
            id:user._id , 
            email ,
        }
        
        return res.status(200).json({
            success:true ,
            message:"User is registered" ,
            user
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:true ,
            message:"Error while signing Up"
        })

        
    }
   


}

exports.login = async(req  , res)=>{
    try{
     const {email , password} = req.body ;
     if(!email || !password){
        return res.status(403).json({
            success:false ,
            message:"Credentials Needed"
        })

     }
     const existingUser = await User.findOne({email}) ;
     console.log(existingUser)
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
        console.log("token" + token)

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
        console.log(err)
        return res.status(400).json({
            success:false ,
            message:"Couldn't Login"
        })
    }
}

// exports.changePassword= async(req , res)=>{
//     try{
//         const{oldPassword , newPassword , confirmNewPassword , email}= req.body ;
//         if(!oldPassword || !newPassword || !confirmNewPassword){
//             return res.status(400).json({
//                  success:false ,
//                 message:"Credentials Needed"
//             })
//         }
//         const user = await User .find({email}) ;
    
//         if(await bcrypt.compare(oldPassword , user.password)){
//             if(newPassword!==confirmNewPassword){
//                 return res.status(400).json({
//                     success:false ,
//                     message:"Old and New Password Do not match"
//                 })
//             }else{
//                 await User.findOneAndUpdate({})
//             }
    
//         } else{
//             return res.status(400).json({
//                 success:false ,
//                 message:"Old Password is invalid"
//             })
//         }

//         mailSender(email , "Password Changed" , "Password Changed Successfully")


//         return res.status(200).json({
//             success:true ,
//             message:"Password Changed Successfully"
//         })
    

//     }catch(err){
//         return res.status(400).json({
//             success:true ,
//             message:"Couldnt Update Password"
//         })
//     }
   
// }


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Check if user already exists in our database
//     let user = await User.findOne({ googleId: profile.id });

//     if (user) {
//       // If user exists, return the user
//       return done(null, user);
//     } else {
//       // If not, create a new user
//       user = await User.create({
//         googleId: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         avatar: profile.photos[0].value,
//       });
//       return done(null, user);
//     }
//   } catch (error) {
//     return done(error, false);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// });

// console.log(process.env.GOOGLE_CLIENT_ID)
// console.log(process.env.GOOGLE_CLIENT_SECRET)

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       // Check if user already exists in our database
//       let user = await User.findOne({ googleId: profile.id });
  
//       if (user) {
//         // If user exists, return the user
//         return done(null, user);
//       } else {
//         // If not, create a new user
//         user = await User.create({
//           googleId: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           avatar: profile.photos[0].value,
//         });
//         return done(null, user);
//       }
//     } catch (error) {
//       return done(error, false);
//     }
//   }));
  
//   // Serialize and deserialize for Passport
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   });
  
//   // Google OAuth Callback Handler
//   exports.googleCallback = (req, res) => {
//     // Generate JWT for the authenticated user
//     const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, {
//       expiresIn: "2h",
//     });
  
//     // Redirect or send response with the token
//     res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
//   };


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
  
      const authToken = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
  
      return res.status(200).json({
        success: true,
        token: authToken,
        message: 'User authenticated successfully',
      });
  
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
  


  exports.getUser = async (req, res) => {
    try {
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(token)

        if (!decoded    ) {
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

            console.log("hii")
            console.log(user)
            



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
        console.log(err);

        return res.status(400).json({
            success: false,
            message: "Couldn't fetch user data."
        });
    }
};



exports.createProfile = async (req, res) => {
    try {
        const { gender, birthdate, sexualOrientation, instagram, snapchat, telegram, about, city, state, country, lat, lon } = req.body;

        // Validate input
        if (!gender || !birthdate || !sexualOrientation || (!instagram && !snapchat && !telegram) || !about || !city || !state || !country || !lat || !lon) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing parameters"
            });
        }

        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        const id = req.user.userId || req.user.id;
        console.log(id);

        const user = await User.findById(id).populate('datingProfile');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.datingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        const profileDetails = new Profile({
            age: 12,  // Assuming age needs to be calculated or set elsewhere
            gender,
            birthdate,
            sexualOrientation,
            instagram,
            snapchat,
            telegram,
            about,
            city,
            state,
            country,
            lat,
            lon
        });

        await profileDetails.save();

        user.datingProfile = profileDetails._id;
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profileDetails
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Profile could not be created"
        });
    }
};

