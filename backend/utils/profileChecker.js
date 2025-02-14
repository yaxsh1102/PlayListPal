function isProfileComplete(profile) {
    return profile.lat && profile.lon && profile.gender && profile.sexualOrientation && 
           profile.dateOfBirth && profile.imageUrl && profile.about && profile.city && profile.state;
}

module.exports = isProfileComplete