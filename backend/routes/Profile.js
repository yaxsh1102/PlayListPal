const express =  require("express")
const router= express.Router() 

const { updateProfile , createProfile } = require("../controllers/Profile");

router.post("/addProfile" , updateProfile)
router.post("/makeProfile" , createProfile)

module.exports = router ;