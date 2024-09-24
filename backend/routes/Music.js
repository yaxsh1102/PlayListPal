const express = require("express")
const router = express.Router()

const {
    createPlaylist , addToPlaylist , addToLiked , 
    removeFromLiked , removeFromPlaylist , deletePlaylist ,  renamePlaylist , addToHistory
} = require("../controllers/Music")


router.post("/createPlaylist" , createPlaylist)
router.post("/addToPlaylist" , addToPlaylist)
router.post("/addToLiked" , addToLiked)
router.post("/removeFromLiked" , removeFromLiked) 
router.post("/removeFromPlaylist" , removeFromPlaylist)
router.delete("/deletePlaylist" , deletePlaylist)
router.post("/renamePlaylist" , renamePlaylist)
router.post("/updateHistory" , addToHistory)

module.exports = router  