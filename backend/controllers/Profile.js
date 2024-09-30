const User  = require("../model/User")
const Profile = require("../model/DatingProfile")
const jwt = require("jsonwebtoken")



exports.updateProfile = async (req, res) => {
    try {
        const { gender, birthdate, sexualOrientation, instagram, snapchat, about, city, state, country, telegram  , lat , lon} = req.body;

        if (!gender || !birthdate || !sexualOrientation || (!instagram && !snapchat && !telegram) || !about || !city || !state || !country ||!lat || !lon) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing parameters"
            });
        }

        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded ) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        const id = req.user.userId || req.user.id;
        console.log(id)

        const user = await User.findById(id).populate('datingProfile');
        if (!user || !user.datingProfile) {
            return res.status(404).json({ message: "User or profile not found" });
        }

        const profileDetails = user.datingProfile;
        profileDetails.age = 12; 
        profileDetails.gender = gender;
        profileDetails.birthdate = birthdate;
        profileDetails.sexualOrientation = sexualOrientation;
        profileDetails.instagram = instagram;
        profileDetails.snapchat = snapchat;
        profileDetails.telegram = telegram;
        profileDetails.about = about;
        profileDetails.city = city;
        profileDetails.state = state;
        profileDetails.country = country;
        profileDetails.lat = lat;
        profileDetails.lon = lon;

        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Profile could not be updated"
        });
    }
};

