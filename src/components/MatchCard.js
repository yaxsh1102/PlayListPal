import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaSnapchat } from 'react-icons/fa6';
import { FaTelegramPlane } from 'react-icons/fa';

const MatchCard = () => {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343] text-white flex justify-center items-center py-8 px-4 overflow-y-scroll no-scrollbar">
      <div className="w-full max-w-lg bg-gradient-to-tr from-[#181818] to-[#121111] rounded-lg shadow-lg overflow-hidden flex flex-col overflow-y-scroll no-scrollbar ">
        <div className="w-full flex justify-center p-4">
          <img
            src="https://th.bing.com/th/id/OIP.NbWq3CY2PdNCpHsxAa4f9wAAAA?w=307&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-gray-600"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-indigo-400 text-center mb-4">Yash Mishra</h2>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <p className="font-semibold text-lg w-40">Lives in:</p>
              <p className="text-lg">Mumbai, Maharashtra</p>
            </div>
            <div className="flex items-center mb-2">
              <p className="font-semibold text-lg w-40">Gender:</p>
              <p className="text-lg">Male</p>
            </div>
            <div className="flex items-center mb-2">
              <p className="font-semibold text-lg w-40">Orientation:</p>
              <p className="text-lg">Straight</p>
            </div>
            <div className="flex items-center mb-2">
              <p className="font-semibold text-lg w-40">Age:</p>
              <p className="text-lg">24</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xl font-semibold mb-2">About</p>
            <p className="text-base leading-wide">
              Hello, how are you? I am under the water. Please help me and let me know if you would like to know anything about me. 
              Because we all know how ruthless people can be. Yes, boys, come on. 
              Wyrat Kohli.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <AiOutlineInstagram className="text-2xl md:text-3xl" />
              <p className="text-lg">yaxsh1102</p>
            </div>
            <div className="flex items-center gap-2">
              <FaTelegramPlane className="text-2xl md:text-3xl" />
              <p className="text-lg">yaxsh1102</p>
            </div>
            <div className="flex items-center gap-2">
              <FaSnapchat className="text-2xl md:text-3xl" />
              <p className="text-lg">yaxsh1102</p>
            </div>
          </div>
          {/* New Buttons Section */}
          <div className="flex justify-evenly mt-auto">
            <button className=" text-white    bg-gray-700 font-semibold py-2 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-black  md:w-36 w-28">
              Pass
            </button>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 md:w-36 w-28">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
