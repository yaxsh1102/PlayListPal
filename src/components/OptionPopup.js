import React from 'react';
import { FaTimes } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { addToQueue } from '../redux/playerSlice';
import { useLocation } from 'react-router-dom';
import { removeFromPlaylist } from '../redux/playlistSlice';
import { sendToast } from '../redux/toastSlice';

const OptionPopup = ({options  , setShowAddToPlayList , setShowCenterPopup,showPopup,setShowPopup,popupMessage,setPopupMessage}) => {
  const dispatch = useDispatch()
  const currentSong = useSelector((store)=>store.playlist.selectedSong)
  const location = useLocation()
  const currentUrl = location.pathname.split('/');


    function playlistFunctions(option ){
        if (option==='Add to Playlist'){
            setShowAddToPlayList(true)
            setShowCenterPopup(false)
        } 
        else if (option ==='Remove from this playlist') {
          var name = currentSong['name']
          setShowCenterPopup(false)
          var playlist=currentUrl[2]
          dispatch(sendToast('Removed from '+playlist))
          dispatch(removeFromPlaylist({playlist,name}))
        }
        else{
          dispatch(sendToast("Song Added to Queue"))
          dispatch(addToQueue(currentSong ))
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