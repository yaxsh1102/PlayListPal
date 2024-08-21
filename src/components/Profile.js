import React, { useRef } from 'react';
import "../App.css";
import { useSelector } from 'react-redux';

const Profile = () => {
  const lat = useSelector((store)=>store.user.lat)
  const lon = useSelector((store)=>store.user.lon)
  // Create a single ref to hold all input refs
  const formRefs = useRef({
    name: null,
    email: null,
    contact: null,
    birthdate: null,
    matchesName: null,
    age: null,
    gender: null,
    sexualOrientation: null,
    aboutMe: null,
    city: null,
    state: null,
    country: null,
    instagram: null,
    snapchat: null,
    telegram: null,
  });

  const [isEditingMatchesProfile, setIsEditingMatchesProfile] = React.useState(false);

  const handleEditProfileClick = () => {
    // Add functionality if needed
  };

  const handleDoneProfileClick = () => {
    // Handle saving profile data
    console.log("Profile Data:", {
      name: formRefs.current.name.value,
      email: formRefs.current.email.value,
      contact: formRefs.current.contact.value,
      birthdate: formRefs.current.birthdate.value,
    });
  };

  const handleEditMatchesProfileClick = () => {
    setIsEditingMatchesProfile(true);
  };

  const handleDoneMatchesProfileClick = () => {
      const name= formRefs.current.name.value
      const birthdate = formRefs.current.birthdate.value
      const gender= formRefs.current.gender.value
      const sexualOrientation=formRefs.current.sexualOrientation.value
      const about= formRefs.current.about.value
      const city= formRefs.current.city.value
      const state= formRefs.current.state.value
      const country= formRefs.current.country.value
      const instagram= formRefs.current.instagram.value
      const snapchat= formRefs.current.snapchat.value
      const telegram= formRefs.current.telegram.value
      console.log(telegram)

      if(!birthdate || !gender || !sexualOrientation || !about || !city || !state || !country || !instagram || !snapchat || !telegram){
        //popup
        return 
      }
      edithandler({birthdate , gender , sexualOrientation , about , city , state ,country , instagram , snapchat , telegram})


    
  };

  async function edithandler(vals) {
    try {
      // Log the vals object to check its structure
      // console.log("Data to send:", vals);
  
      const data = await fetch('http://localhost:4000/api/v1/auth/updateProfile', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('db_token')}`
        },
        body: JSON.stringify({...vals , lat:lat , lon:lon})
      });
  
      const resp = await data.json();
      console.log(resp);
  
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
  

  return (
    <div className="pb-[8rem] w-full no-scrollbar flex flex-col items-center py-8 bg-gradient-to-tr from-[#000000] to-[#434343] h-[100vh] overflow-y-scroll space-y-12">
      <div className="w-[90%] p-6 space-y-6 bg-gradient-to-tr from-[#000000cf] to-[#282626a9] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">
          Profile
        </h2>
        <div className="flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder image URL, replace with actual image URL
            alt="User"
            className="w-32 h-32 rounded-full border-2 border-indigo-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="mt-2 px-4 py-2 font-bold text-slate-300 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Change Profile Pic
          </button>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              // Handle file upload here
            }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-14 pt-16">
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.name = el)}
              defaultValue="John Doe"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              ref={(el) => (formRefs.current.email = el)}
              defaultValue="johndoe@example.com"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Contact</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.contact = el)}
              defaultValue="123-456-7890"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Birthdate</label>
            <input
              type="date"
              ref={(el) => (formRefs.current.birthdate = el)}
              defaultValue="1990-01-01"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
        </div>
      </div>

      <div className="w-[90%] p-6 space-y-6 bg-gradient-to-tr from-[#000000cf] to-[#282626a9] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-slate-300">
          {isEditingMatchesProfile ? "Edit Dating Profile" : "Dating Profile"}
        </h2>
        <div className="flex flex-wrap justify-center gap-14 pt-16">
         
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Gender</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.gender = el)}
              defaultValue="Female"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Sexual Orientation</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.sexualOrientation = el)}
              defaultValue="Heterosexual"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">About Me</label>
            <textarea
              ref={(el) => (formRefs.current.about = el)}
              defaultValue="Lorem ipsum dolor sit amet."
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              rows="3"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">City</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.city = el)}
              defaultValue="New York"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">State</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.state = el)}
              defaultValue="NY"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Country</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.country = el)}
              defaultValue="USA"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Instagram</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.instagram = el)}
              defaultValue="@jane_doe"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Snapchat</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.snapchat = el)}
              defaultValue="@jane_doe"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
          <div className='lg:w-1/3 md:w-full'>
            <label className="block text-sm font-medium text-slate-300">Telegram</label>
            <input
              type="text"
              ref={(el) => (formRefs.current.telegram = el)}
              defaultValue="@jane_doe"
              className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4">
           
            <button
              className="px-4 py-2 font-bold text-slate-300 bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-400 w-[12rem]"
            onClick={handleDoneMatchesProfileClick} >
              Edit
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
