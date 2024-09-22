const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema= new mongoose.Schema({
    email:{
        type:String ,
        required:true 
    } ,
    otp:{
        type:String ,
        required:true ,
    } ,
    createdAt:{
        type:Date ,
        default:Date.now() ,
        expires:5*60
    }
})

//send email here

async function sendVerificationEmail(email , otp){
    try{
        const mailResponse= await mailSender(email , "Verification Email" , otp)
        console.log("Mail Sent SuccessFully")
        console.log("hii")

    }catch(err){
        console.log("Error Occured : " + err)

    }
}

otpSchema.pre("save" , async function(next){
    await sendVerificationEmail(this.email , this.otp)
    next() ;
})
module.exports=mongoose.model("OTP" , otpSchema)