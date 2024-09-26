import React, { useRef , useState} from 'react';
import "../App.css";
import { useSelector , useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()

  const [profileImage, setProfileImage] = useState(user.imageUrl || 'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

  const formRefs = useRef({
    name: user.name,
    email: user.email,
    birthdate: user.birthdate,
    gender: user.gender,
    sexualOrientation: user.sexualOrientation,
    aboutMe: user.aboutMe,
    city: user.city,
    state: user.state,
    country: user.country,
    instagram: user.instagram,
    snapchat: user.snapchat,
    telegram: user.telegram,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');

    const formData = new FormData();
    formData.append('imageUrl', fileInput.files[0] || user.imageUrl);
    formData.append('name', formRefs.current.name.value);
    formData.append('birthdate', formRefs.current.birthdate.value);
    formData.append('gender', formRefs.current.gender.value);
    formData.append('sexualOrientation', formRefs.current.sexualOrientation.value);
    formData.append('aboutMe', formRefs.current.aboutMe.value);
    formData.append('city', formRefs.current.city.value);
    formData.append('state', formRefs.current.state.value);
    formData.append('country', formRefs.current.country.value);
    formData.append('instagram', formRefs.current.instagram.value);
    formData.append('snapchat', formRefs.current.snapchat.value);
    formData.append('telegram', formRefs.current.telegram.value);

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/updateProfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('db_token')}`,
        },
        body:formData,
      });

      const respData = await response.json();
      console.log(respData)
      dispatch(setUser(respData.user))
      console.log(respData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

 
  

  return (
    <div className="pb-[8rem] w-full no-scrollbar flex flex-col items-center py-8 bg-gradient-to-tr from-[#000000] to-[#434343] h-[100vh] overflow-y-scroll space-y-12">
    <div className="w-[90%] p-6 space-y-6 bg-gradient-to-tr from-[#000000cf] to-[#282626a9] rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-white">Profile</h2>
      <div className="flex justify-center">
        <img
          src={profileImage}
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
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-14 pt-16">
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Full Name</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.name = el)}
            defaultValue={user.name || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Email</label>
          <input
            type="email"
            ref={(el) => (formRefs.current.email = el)}
            defaultValue={user.email || ""}
            disabled
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
      </div>
    </div>

    <div className="w-[90%] p-6 space-y-6 bg-gradient-to-tr from-[#000000cf] to-[#282626a9] rounded-lg shadow-md">
      <div className="flex flex-wrap justify-center gap-14 pt-16">
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Birthdate</label>
          <input
            type="date"
            ref={(el) => (formRefs.current.birthdate = el)}
            defaultValue={user.dateOfBirth || "1990-01-01"}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Gender</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.gender = el)}
            defaultValue={user.gender || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Sexual Orientation</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.sexualOrientation = el)}
            defaultValue={user.sexualOrientation || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">About Me</label>
          <textarea
            ref={(el) => (formRefs.current.aboutMe = el)}
            defaultValue={user.about || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            rows="3"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">City</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.city = el)}
            defaultValue={user.city || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">State</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.state = el)}
            defaultValue={user.State || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Country</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.country = el)}
            defaultValue={user.country || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Instagram</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.instagram = el)}
            defaultValue={user.instagram || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Snapchat</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.snapchat = el)}
            defaultValue={user.snapchat || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <div className='lg:w-1/3 md:w-full'>
          <label className="block text-sm font-medium text-slate-300">Telegram</label>
          <input
            type="text"
            ref={(el) => (formRefs.current.telegram = el)}
            defaultValue={user.telegram || ""}
            className="w-full px-3 py-2 mt-1 text-slate-300 bg-gray-900 border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
          onClick={handleFormSubmit}
        >
          Update Profile
        </button>
      </div>
    </div>
  </div>
  );
};

export default Profile;
