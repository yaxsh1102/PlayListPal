const express =  require("express")
const passport = require('passport');
const app = express()

const router= express.Router() 

const {
    login , signUp , sendOTP , verifyGoogleToken , getUser  , updateProfile , addLocation , fetchProfile , getLikedOrHistory , getPlaylists
}  = require ("../controllers/Auth")
 

router.post("/login" , login)
router.post("/signup" , signUp)
router.post("/sendOTP" , sendOTP)
router.post('/google/token', verifyGoogleToken);
router.get('/getUserDetails', getUser);
router.post('/updateProfile', updateProfile);
router.post('/addLocation', addLocation);
router.get('/fetchProfile', fetchProfile);
router.get('/getLikedOrHistory', getLikedOrHistory);
router.get('/getplayLists', getPlaylists);




module.exports = router ;  