const nodemailer = require("nodemailer")
require("dotenv").config()
const emailTemplate = require("../template/otp")
const mailSender = async(email , title,otp )=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST ,
            auth:{
                user:process.env.MAIL_USER ,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from:'SoundMate/PlayListPal' ,
            to:`${email}`,
            subject:`${title}` ,
            html:`${emailTemplate(otp)}`
        })
        
    } catch (error) {
       
        
    }
}
module.exports=mailSender