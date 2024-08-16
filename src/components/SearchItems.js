import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlaying } from '../redux/playerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { addToLikedSongs,removeFromLikedSongs,setSelectedSong } from '../redux/playlistSlice';
import OptionPopup from './OptionPopup';
import PlayListPopup from './PlayListPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendToast } from '../redux/toastSlice';

const Searchitems = ({ image, name, artist, duration, singer, type, url }) => {
  const dur = (duration / (60 * 1000)).toFixed(2);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false); 
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const likedSongs = useSelector((state) => state.playlist.likedSongs || []);
  const location = useLocation()
  const currentUrl = location.pathname.split('/');
  const [showCenterPopup, setShowCenterPopup] = useState(false);
  const [showAddToPlayList, setShowAddToPlayList] = useState(false);
  const [oldPlayList, setOldPlaylist] = useState(true);
  const nowPlayingObj = { image, name, artist, duration, singer, type, url };
  const options = [
    { label: 'Add to Queue' },
    { label: 'Add to Playlist'}
  ];

  if (currentUrl[1]==='userplaylists'){
    options.push({ label: 'Remove from this playlist'})
  }

  if (likedSongs.some((song) => song.name === name) !== liked) {
    setLiked(likedSongs.some((song) => song.name === name));
  }

  const clickHandler = () => {
    if(!type){
    dispatch(addNowPlaying(nowPlayingObj));
    }else{
      navigate(`result/${name}`)
    }
  };

  const toggleLike = () => {
    dispatch(liked ? removeFromLikedSongs(nowPlayingObj) : addToLikedSongs(nowPlayingObj));
    setLiked(!liked);
    dispatch(!liked ? sendToast('Added to Liked Songs') : sendToast ('Removed from Liked Songs'))
  };

  const toggleCenterPopup = () => {setShowCenterPopup((prev) => !prev)
    dispatch(setSelectedSong(nowPlayingObj));}

return (
  <div className={`relative w-full flex`}>
    {(showAddToPlayList  || showCenterPopup || !oldPlayList  ) &&  (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setShowCenterPopup(false)}
      ></div>
    )}
    <div
      className={`w-full flex`}
    >
      <div
        className="flex text-white items-center gap-x-4 w-full bg-transparent border-b-[1px] group border-black mt-2"
        onClick={clickHandler}
      >
        <img
          src={image}
          alt="image.logo"
          className="w-20 h-20 ml-2 p-1 group-hover:opacity-50"
        />
        <div className="px-4 group-hover:text-gray-600">
          <p className="md:text-lg lg:text-xl xl:text-2xl group-hover:text-opacity-50">{name}</p>
          <div className="md:flex hidden gap-x-4">
            {artist && <p className="max-w-[140px]">{artist}</p>}
            {singer && <p>• {singer}</p>}
            {duration ? <p>• {dur}</p> : <p>• {type}</p>}
          </div>
        </div>
      </div>
      <div className="flex text-white items-center gap-x-3 bg-transparent border-b-[1px] border-black mt-2">
        <div className="ml-auto">
          <button onClick={toggleLike} className="focus:outline-none">
            <FontAwesomeIcon
              icon={liked ? faSolidHeart : faRegularHeart}
              className={liked ? 'text-red-500 h-5' : 'text-white h-5'}
            />
          </button>
        </div>
        <div className='rounded-full hover:bg-[#363434]'>
          <button onClick={toggleCenterPopup}>
            <BiDotsVerticalRounded className="text-white w-10 h-8 relative top-1" />
          </button>
        </div>
      </div>
    </div>
    {showCenterPopup ? ( <OptionPopup options={options}  setShowAddToPlayList={setShowAddToPlayList} 
    onClose={toggleCenterPopup} setShowCenterPopup = {setShowCenterPopup} 
    showPopup={showPopup} setShowPopup={setShowPopup} popupMessage={popupMessage} setPopupMessage={setPopupMessage}/>) 
    :
    (showAddToPlayList ? (<PlayListPopup oldPlayList={oldPlayList} setOldPlaylist={setOldPlaylist} 
    setShowAddToPlayList={setShowAddToPlayList} setShowCenterPopup = {setShowCenterPopup} setShowPopup={setShowPopup} setPopupMessage={setPopupMessage}/>):(<></>))}

  </div>
);
};
export default Searchitems;
