import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon

const OptionPopup = ({options  , setShowAddToPlayList , setShowCenterPopup}) => {
    function AddToPlaylist(option ){
        console.log(typeof option)
        const data = option.split(" ") 
        if (data[2]==='Playlist'){
            setShowAddToPlayList(true)
            setShowCenterPopup(false)
        }



         
       

        
    }
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 shadow-lg rounded-lg z-50 h-[12rem] w-[14rem] flex flex-col justify-center items-stretch bg-[#191919] text-slate-200">
          <button onClick={()=>{setShowCenterPopup(false)}} className="absolute top-4 right-4">
            <FaTimes className="w-4 h-4 text-slate-200" />
          </button>
          <div className="flex flex-col items-centerb gap-y-4 justify-center">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={ ()=>{AddToPlaylist(option.label)}}
                 
                className="p-2 hover:bg-[#1d1d1d] w-full"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
    )
};

export default OptionPopup;
