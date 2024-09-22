const express =  require("express")
const router= express.Router() 

const { updateProfile , createProfile } = require("../controllers/Profile");
const { getMatches } = require("../controllers/Matches");

router.post("/addProfile" , updateProfile)
router.post("/getMatches" , getMatches)
router.post("/makeProfile" , createProfile)

module.exports = router ;