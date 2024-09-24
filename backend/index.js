const express = require("express")
const app = express() 
const cors = require("cors");
require("dotenv").config()



const dbConnect = require("./config/database") 
dbConnect.connect();
const userRoutes = require("./routes/User")
const musicRoutes = require("./routes/Music")
const profileRoutes = require("./routes/Profile")
const matchRoutes = require("./routes/Matches")
 
  
  app.use(express.json());
  app.use(cors({ origin: '*', credentials: true })); 




 
// app.use(cookieParser());

app.use("/api/v1/auth" , userRoutes)
app.use("/api/v1/music" , musicRoutes)
app.use("/api/v1/profile" , profileRoutes)
app.use("/api/v1/match" , matchRoutes)


app.listen(process.env.PORT, () => {
	console.log(`App is listening at ${process.env.PORT}`);
});
 