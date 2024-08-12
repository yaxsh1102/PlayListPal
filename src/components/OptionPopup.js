import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon
import { useDispatch, useSelector } from 'react-redux';
import { addToQueue } from '../redux/playerSlice';
import Popup from './Popup';
import { useLocation } from 'react-router-dom';
import { removeFromPlaylist } from '../redux/playlistSlice';

const OptionPopup = ({options  , setShowAddToPlayList , setShowCenterPopup,showPopup,setShowPopup,popupMessage,setPopupMessage}) => {
  const dispatch = useDispatch()
  const currentSong = useSelector((store)=>store.playlist.selectedSong)
  const location = useLocation()
  const currentUrl = location.pathname.split('/');


    function playlistFunctions(option ){
        console.log(typeof option)

        if (option==='Add to Playlist'){
            setShowAddToPlayList(true)
            setShowCenterPopup(false)
        } 
        else if (option ==='Remove from this playlist') {
          var name = currentSong['name']
          setShowCenterPopup(false)
          var playlist=currentUrl[2]
          setPopupMessage('Removed from '+playlist);
          dispatch(removeFromPlaylist({playlist,name}))
            setShowPopup(true)
            setTimeout(() => {
              setShowPopup(false);    
            }, 2000);
        }
        else{
          console.log(currentSong)
          dispatch(addToQueue(currentSong ))
          setShowCenterPopup(false)
          setPopupMessage("Song Added to Queue")
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 2000);
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
                onClick={ ()=>{playlistFunctions(option.label)}}
                 
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