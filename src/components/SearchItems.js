
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlaying } from '../redux/playerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { BiDotsVerticalRounded } from 'react-icons/bi'; // Importing the vertical dots icon
import Popup from './Popup'; // Import the Popup component
import { addToLikedSongs,removeFromLikedSongs,setSelectedSong } from '../redux/playlistSlice';
import OptionPopup from './OptionPopup';
import PlayListPopup from './PlaylistPopup';

const Searchitems = ({ image, name, artist, duration, singer, type, url }) => {
  const dur = (duration / (60 * 1000)).toFixed(2);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const likedSongs = useSelector((state) => state.playlist.likedSongs || []);

  const [showCenterPopup, setShowCenterPopup] = useState(false);
  const [showAddToPlayList, setShowAddToPlayList] = useState(false);
  const [isPopUp , setShowIsPopup] = useState(false)
  const [oldPlayList, setOldPlaylist] = useState(true);
  const nowPlayingObj = { image, name, artist, duration, singer, type, url };
  const options = [
    { label: 'Add to Queue', onClick: () => console.log('Add to Queue clicked') },
    { label: 'Add to Playlist', onClick: () => setShowAddToPlayList(true) }, // Set showAddToPlayList to true
  ];

  if (likedSongs.some((song) => song.name === name) !== liked) {
    setLiked(likedSongs.some((song) => song.name === name));
  }

  const clickHandler = () => {
    dispatch(addNowPlaying(nowPlayingObj));
  };

  const toggleLike = () => {
    dispatch(liked ? removeFromLikedSongs(nowPlayingObj) : addToLikedSongs(nowPlayingObj));
    setLiked(!liked);
    setPopupMessage(!liked ? 'Added to Liked Songs' : 'Removed from Liked Songs');
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const toggleCenterPopup = () => {setShowCenterPopup((prev) => !prev)
    dispatch(setSelectedSong(nowPlayingObj));}

  // useEffect(()=>{
  //   if(likedSongs.filter((song)=>song.name===name).length===1){
  //     setLiked(true)
  //   }else{
  //     setLiked(false)
  //   }
  // })

  // function clickHandler() {
  //   const nowPlayingObj = {
  //     image: image,
  //     name: name,
  //     singer: singer,
  //     artist: artist,
  //     url: url,
  //   };
  //   dispatch(addNowPlaying(nowPlayingObj));
  // }

  // function toggleLike() {
  //   dispatch(!liked ? addToLikedSongs({ image, name, artist, duration, singer, type, url }) : 
  //   removeFromLikedSongs({ image, name, artist, duration, singer, type, url }))
  //   console.log("Song Dispatched")

  //   setLiked(!liked);
  //   setPopupMessage(!liked ? 'Added to Liked Songs' : 'Removed from Liked Songs');
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 2000);
  // }

  function closePopup() {
    setShowPopup(false);
  }

  // const randomfunc =()=>{
  //   dispatch(addToPlaylist({playlist:"A" , song:{ image, name, artist, duration, singer, type, url }}))
  // }

//   return (
//     <div className="w-full flex">
//       <div
//         className="flex text-white items-center gap-x-4 w-full bg-transparent border-b-[1px] group border-black mt-2"
//         onClick={clickHandler}
//       >
//         <img
//           src={image}
//           alt="image.logo"
//           className="w-20 h-20 ml-2 p-1 group-hover:opacity-50"
//         ></img>
//         <div className="px-4 group-hover:text-gray-600">
//           <p className="md:text-lg lg:text-xl xl:text-2xl group-hover:text-opacity-50">
//             {name}
//           </p>
//           <div className="md:flex hidden gap-x-4">
//             {artist && <p>{artist}</p>}
//             {singer && <p>• {singer}</p>}
//             {duration ? <p>• {dur}</p> : <p>• {type}</p>}
//           </div>
//         </div>
//       </div>
//       <div className="flex text-white items-center gap-x-3 bg-transparent border-b-[1px] border-black mt-2">
//         <div className="ml-auto">
//           <button onClick={toggleLike} className="focus:outline-none">
//             <FontAwesomeIcon
//               icon={liked ? faSolidHeart : faRegularHeart}
//               className={liked ? 'text-red-500 h-5' : 'text-white h-5'}
//             />
//           </button>
//         </div>
//         <div>
//           <button>
//             <BiDotsVerticalRounded className="text-white w-14 h-8 relative top-1" />
//           </button>
//         </div>
//       </div>
//       {showPopup && <Popup message={popupMessage} onClose={closePopup} visible={showPopup} />}
//     </div>
//   );
// };


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
            {artist && <p>{artist}</p>}
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
    {showCenterPopup ? ( <OptionPopup options={options}  setShowAddToPlayList={setShowAddToPlayList} onClose={toggleCenterPopup} setShowCenterPopup = {setShowCenterPopup}/>) :(showAddToPlayList ? (<PlayListPopup oldPlayList={oldPlayList} setOldPlaylist={setOldPlaylist} setShowAddToPlayList={setShowAddToPlayList} setShowCenterPopup = {setShowCenterPopup}/>):(<></>))}
    {showPopup && <Popup message={popupMessage} onClose={closePopup} visible={showPopup} />}
  </div>
);
};
export default Searchitems;

