const express = require("express")
const router = express.Router()


const {getMatches , acceptRequest , rejectRequest , sendRequest , removeFriend , getDetails} = require("../controllers/Matches")

router.post("/getMatches" , getMatches)
router.post("/getInfo" , getDetails)
router.post("/acceptRequest" ,acceptRequest)
router.post("/sendRequest" , sendRequest)
router.post("/rejectRequest" , rejectRequest)
router.post("/removeFriend" , removeFriend)


module.exports = router
