const express = require("express")
const app = express() 
const cors = require("cors");
require("dotenv").config()
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require('express-fileupload'); // Ensure this import is correct



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


app.listen(process.env.PORT, () => {
	console.log('App is running');
});
 