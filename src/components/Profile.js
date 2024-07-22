import React, { useState } from 'react';
import SexualOrientation from './SexualOrientation';
import "../App.css"

const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingMatchesProfile, setIsEditingMatchesProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('Profile');
  const [matchesProfileMsg, setMatchesProfileMsg] = useState('Dating Profile');

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
    setProfileMsg("Edit Profile");
  };

  const handleDoneProfileClick = () => {
    setIsEditingProfile(false);
    setProfileMsg("Profile");
  };

  const handleEditMatchesProfileClick = () => {
    setIsEditingMatchesProfile(true);
    setMatchesProfileMsg("Edit Dating Profile");
  };

  const handleDoneMatchesProfileClick = () => {
    setIsEditingMatchesProfile(false);
    setMatchesProfileMsg("Dating Profile");
  };

  return (
    <div className="pb-[8rem] w-full no-scrollbar flex flex-col items-center py-8 bg-gradient-to-tr from-[#000000] to-[#434343] h-[100vh] overflow-y-scroll space-y-12  ">
      <div className="w-[90%] p-6 space-y-6 bg-gradient-to-tr from-[#000000cf] to-[#282626a9] rounded-lg shadow-md ">
        <h2 className="text-3xl font-bold text-center text-white">{profileMsg}</h2>
        <div className="flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder image URL, replace with actual image URL
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-indigo-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="mt-2 px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
          >
            Change Profile Pic
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-14 pt-16">
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              disabled={!isEditingProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              disabled={!isEditingProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Contact Number</label>
            <input
              type="tel"
              defaultValue="123-456-7890"
              disabled={!isEditingProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Birthdate</label>
            <input
              type="date"
              defaultValue="1990-01-01"
              disabled={!isEditingProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
        </div>
        <div className="flex justify-start pt-6">
          {!isEditingProfile && (
            <button
              onClick={handleEditProfileClick}
              className="mt-4 px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
            >
              Edit Profile
            </button>
          )}
          {isEditingProfile && (
            <button
              onClick={handleDoneProfileClick}
              className="mt-4 px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
            >
              Done
            </button>
          )}
        </div>
      </div>

      <div className="w-[90%]  p-6 space-y-6 bg-gradient-to-bl from-[#000000cf] to-[#282626a9] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">{matchesProfileMsg}</h2>
        <div className="flex flex-wrap justify-center gap-14 pt-16">
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Age</label>
            <input
              type="number"
              defaultValue="30"
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Gender</label>
            <select
              defaultValue="Male"
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Sexual Orientation</label>
            <SexualOrientation isEditingMatchesProfile={isEditingMatchesProfile}/>
            </div >
          <div className='w-[71%]'>
            <label className="block text-sm font-medium text-white">About Me</label>
            <textarea
              defaultValue="A brief description about yourself..."
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              rows="4"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">City</label>
            <input
              type="text"
              defaultValue="New York"
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">State</label>
            <input
              type="text"
              defaultValue="NY"
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Country</label>
            <input
              type="text"
              defaultValue="USA"
              disabled={!isEditingMatchesProfile}
              className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-white">Social Medias</label>
            <div className="flex items-center space-x-2">
              <span className="w-1/12 text-white">
                <i className="fab fa-instagram"></i>
              </span>
              <input
                type="text"
                placeholder="Instagram Username"
                disabled={!isEditingMatchesProfile}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="w-1/12 text-white">
                <i className="fab fa-snapchat"></i>
              </span>
              <input
                type="text"
                placeholder="Snapchat Username"
                disabled={!isEditingMatchesProfile}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="w-1/12 text-white">
                <i className="fab fa-telegram"></i>
              </span>
              <input
                type="text"
                placeholder="Telegram Username"
                disabled={!isEditingMatchesProfile}
                className="w-full px-3 py-2 mt-1 text-black bg-gray-300 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-6">
          {!isEditingMatchesProfile && (
            <button
              onClick={handleEditMatchesProfileClick}
              className="mt-4 px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
            >
              Edit Dating Profile
            </button>
          )}
          {isEditingMatchesProfile && (
            <button
              onClick={handleDoneMatchesProfileClick}
              className="mt-4 px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
