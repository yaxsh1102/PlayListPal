import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlaying, updateHistory } from '../../redux/playerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { addToLikedSongs,removeFromLikedSongs,setSelectedSong } from '../../redux/playlistSlice';
import OptionPopup from '../playlist/OptionPopup';
import PlayListPopup from '../playlist/PlayListPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendToast } from '../../redux/toastSlice';

const Searchitems = ({ image, name, artist, duration, singer, type, url , isAlbum}) => {
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
    manageHistory()

    }else{
      navigate(`result/${name}`)
    }
  };

  const toggleLike = () => {

    dispatch(liked ? removeFromLikedSongs(nowPlayingObj) : addToLikedSongs(nowPlayingObj));
    if(liked){
      removeLike()
     

    } else {
      addLike()

    }
    setLiked(!liked);
    dispatch(!liked ? sendToast('Added to Liked Songs') : sendToast ('Removed from Liked Songs'))
  };

  async function manageHistory(){ 
    if(!localStorage.getItem('db_token')){
      return 
  }



  try{
    const data = await fetch("http://localhost:4000/api/v1/music/updateHistory" , {
      method:"post" ,
      headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('db_token')}`
        },
        body: JSON.stringify({
          preview_url: nowPlayingObj.url,
          image: nowPlayingObj.image,
          singer: nowPlayingObj.singer, 
          artist: nowPlayingObj.artist, 
          name: nowPlayingObj.name
      })      
  })
  dispatch(updateHistory(nowPlayingObj))
  }catch(err){

  }







  }

  const toggleCenterPopup = () => {setShowCenterPopup((prev) => !prev)
    dispatch(setSelectedSong(nowPlayingObj));}

    async function addLike(){

      try{
        const data = await fetch('http://localhost:4000/api/v1/music/addToLiked' , { 
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('db_token')}`
  
          },
          body: JSON.stringify({  preview_url:url , image ,singer ,artist,name , }),
        });
    
        const resp = await data.json() ;

      }catch(err){

      }
    
  
       };


  async function removeLike(){
         try{
          const data = await fetch('http://localhost:4000/api/v1/music/removeFromLiked' , { 
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('db_token')}`
    
            },
            body: JSON.stringify({ name:name , }),
          });
      
          const resp = await data.json() ;
      
         }catch(err){

         }

       
         };

    

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
        <div className="px-4 group-hover:gray-red-600">
          <p className="md:text-lg lg:text-xl xl:text-2xl group-hover:text-opacity-50">{name}</p>
          <div className="md:flex hidden gap-x-4">
            {artist && <p className="max-w-[140px]">{artist}</p>}
            {singer && <p>• {singer}</p>}
            {duration ? <p>• {dur}</p> : <p>• {type}</p>}
          </div>
        </div>
      </div>
     {!isAlbum &&  <div className="flex text-white items-center gap-x-3 bg-transparent border-b-[1px] border-black mt-2">
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
}
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
