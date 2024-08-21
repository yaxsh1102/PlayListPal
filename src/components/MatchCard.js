import React, { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { FaInstagram, FaTelegramPlane, FaSnapchatGhost } from 'react-icons/fa';

const MatchCard = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="w-full h-screen  text-white flex flex-col mt-8 items-center">
      <div
        className="w-full max-w-sm h-[70vh] bg-cover bg-center rounded-2xl shadow-lg relative"
        style={{
          backgroundImage:
            'url(shivansh.jpg)',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent flex  items-center space-y-2">
          <div className="flex justify-between items-center w-full px-4">
            <p className="text-lg font-semibold">Shivansh Jha, 18</p>
          </div>

          <div className="flex justify-end items-center px-4">
            <button
              className="text-white text-2xl cursor-pointer"
              onClick={toggleOverlay}
            >
              <IoIosArrowUp />
            </button>
          </div>
        </div>

        {/* Overlay */}
        {showOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-10 overflow-auto no-scrollbar">
            <div className="text-left flex flex-col justify-start space-y-4 w-full max-w-md px-4 py-6 bg-opacity-100 rounded-lg">
              <p className="text-xl mb-0 pt-16">Bio:</p>
              <p className="text-md mb-0 text-start">
                This is the overlay text. You can add more details or information about the user here. I am a mad person I don't like I am under the water please help me get out of here, please please Wyrat Kohli.
              </p>

              {/* Info Section with Consistent Indentation */}
              <div className="space-y-2">
                <div className="flex">
                  <p className="text-md w-32">Gender:</p>
                  <p className="text-md ml-4">Male</p>
                </div>
                <div className="flex">
                  <p className="text-md w-32">Orientation:</p>
                  <p className="text-md ml-4">Straight</p>
                </div>
                <div className="flex">
                  <p className="text-md w-32">Lives in:</p>
                  <p className="text-md ml-4">Mumbai, Maharashtra</p>
                </div>
              </div>

              {/* Socials */}
              <div className="text-md mb-4">
                <p className="mb-2">Socials:</p>
                <div className="flex flex-col space-y-2 ml-2">
                  <div className="flex items-center space-x-2">
                    <FaInstagram />
                    <span>username</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaTelegramPlane />
                    <span>telegramhandle</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaSnapchatGhost />
                    <span>snapchatusername</span>
                  </div>
                </div>
              </div>

              <button
                className="bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200 self-center"
                onClick={toggleOverlay}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="md:w-[384px] w-full flex justify-evenly mt-4 px-4 ">
        <button className="bg-gray-700 text-white text-xl w-[8rem] h-[2rem] rounded-sm">
          Pass
        </button>
        <button className="bg-indigo-500 text-white text-xl w-[8rem] h-[2rem] rounded-sm">
          Accept
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
