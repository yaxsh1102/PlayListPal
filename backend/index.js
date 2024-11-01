const express = require("express")
const app = express() 
const cors = require("cors");
require("dotenv").config()
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require('express-fileupload'); 



const dbConnect = require("./config/database") 
dbConnect.connect();
const userRoutes = require("./routes/User")
const musicRoutes = require("./routes/Music")
const matchRoutes = require("./routes/Matches")
 
  
  app.use(express.json());
  app.use(cors({ origin: '*', credentials: true })); 
  app.use(
    fileUpload({
      useTempFiles: true	})
  );
  
  
  cloudinaryConnect();
app.use("/api/v1/auth" , userRoutes)
app.use("/api/v1/music" , musicRoutes)
app.use("/api/v1/match" , matchRoutes)

//to awake the server

app.get("/awake-server" , async(req , res)=>{
  try{
    return res.status(200).json({
      success:true ,
      message:"Server Awake"
    })
  }catch(err){
    return res.status(500).json({
      success:false ,
      message:"Error Occured"
    })
  }
})


app.listen(process.env.PORT, () => {
	console.log('App is running');
});
 