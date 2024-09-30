import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToQueue, initiateQueue, nextButton, prevButton} from '../../redux/playerSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToLikedSongs, removeFromLikedSongs } from '../../redux/playlistSlice';
import { sendToast } from '../../redux/toastSlice';

const MusicPlayer = ({ nowPlaying }) => {
  const { url } = nowPlaying;
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nowPlayingObj = useSelector((store) => store.player.nowPlaying);
  const queue = useSelector((store) => store.player.queue);
  const likedSongs = useSelector((store)=>store.playlist.likedSongs)
  const isLiked = likedSongs.some((song) => song.url === nowPlayingObj.url);

   async function addLike(){
    try{
      const data = await fetch('http://localhost:4000/api/v1/music/addToLiked' , { 
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('db_token')}`

        },
        body: JSON.stringify({  preview_url:nowPlayingObj.url , image:nowPlayingObj.image ,singer:nowPlayingObj.singer ,artist:nowPlayingObj.artist,name:nowPlayingObj.name , }),
      });
  

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
            body: JSON.stringify({ name:nowPlayingObj.name , }),
          });

        }catch(err){

        }
      
    
        

        
         };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(url);

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      setIsPlaying(false);
    });

 
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [nowPlaying.url]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        setIsPlaying(false);
      });
    }
  };


  const prevHandler = () => {
    dispatch(prevButton());
  };

  const nextHandler = () => {
    dispatch(nextButton());
  };

  function clickHandler() {
    navigate("/play-music");
  }

  function likeHandler(){
    dispatch(isLiked? removeFromLikedSongs(nowPlayingObj) : addToLikedSongs(nowPlayingObj));
    if(isLiked){
      removeLike()
     

    } else {
      addLike()

    }
    dispatch(!isLiked ? sendToast('Added to Liked gvvv Songs') : sendToast ('Removed from Liked Songs'))
  }

  function adddToQueueHandler() {
    const index = queue.findIndex((item) => item.url === nowPlayingObj.url);

    if (index === -1) {
     
      dispatch(addToQueue(nowPlayingObj));
      dispatch(sendToast("Song Added To Queue"))
      
    } else {
      dispatch(sendToast("Song Already In Queue"))
    }
      
    }

  function shuffleHandler() {
    const arrayCopy = [...queue];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    dispatch(initiateQueue(arrayCopy));
    dispatch(sendToast("Queue Shuffled"))
  }

  return (
    <div className='absolute md:bottom-8 bottom-0 w-[100vw] right-0  xl:h-[4rem] md:h-[3rem] 2rem flex justify-center'>
    <div className=" music-player bg-[#212529] h-[6rem] z-50 flex w-[100%] mx-auto items-center justify-evenly lg:px-10 md:px-5 px-1">
      <div className='w-3/12 flex justify-evenly'>
        <button onClick={prevHandler}>
          <svg xmlns="http://www.w3.org/2000/svg"  class=" lg:w-[32px] lg:h-[32px] md:w-[28px] md:h-[28px] w-[32px] h-[32px]" fill="#f5f0f0" viewBox="0 0 256 256"><path d="M199.81,34a16,16,0,0,0-16.24.43L64,109.23V40a8,8,0,0,0-16,0V216a8,8,0,0,0,16,0V146.77l119.57,74.78A15.95,15.95,0,0,0,208,208.12V47.88A15.86,15.86,0,0,0,199.81,34ZM192,208,64.16,128,192,48.07Z"></path></svg>
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? (<svg xmlns="http://www.w3.org/2000/svg"  class="lg:w-[32px] lg:h-[32px] md:w-[28px] md:h-[28px] w-[32px] h-[32px]" fill="#f5f0f0" viewBox="0 0 256 256"><path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"></path></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f5f0f0" viewBox="0 0 256 256"><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path></svg>)}
        </button>
        <button onClick={nextHandler}>
          <svg xmlns="http://www.w3.org/2000/svg"  class=" lg:w-[32px] lg:h-[32px] md:w-[28px] md:h-[28px] w-[32px] h-[32px]" fill="#f5f0f0" viewBox="0 0 256 256"><path d="M200,32a8,8,0,0,0-8,8v69.23L72.43,34.45A15.95,15.95,0,0,0,48,47.88V208.12a16,16,0,0,0,24.43,13.43L192,146.77V216a8,8,0,0,0,16,0V40A8,8,0,0,0,200,32ZM64,207.93V48.05l127.84,80Z"></path></svg>
        </button>
      </div>
      <div className='flex justify-start items-center px-2 md:w-3/12 w-6/12 gap-x-5' onClick={clickHandler}>
        <img src ={nowPlaying.image} alt='11.png' className='lg:w-[5.5rem] lg:h-[5rem] md:w-[4rem] h-[3.5rem] '></img>
          <div>
            <p className='text-white lg:text-[1.1rem] md:text-[1rem] text-[0.9rem] '> {nowPlaying.name}</p>
            <p className="text-slate-300 sm:flex hidde opacity-90 text-[0.9rem]">{nowPlaying.singer}</p>
          </div>
      </div>
      
      <div className='w-3/12 md:flex hidden justify-evenly'>
        <button onClick={likeHandler} className="focus:outline-none">
              <FontAwesomeIcon
                icon={isLiked ? faSolidHeart : faRegularHeart}
                className={isLiked ? 'text-red-500 class="lg:w-[28px] lg:h-[28px] md:w-[28px] md:h-[28px] w-[28px] h-[28px]' : 'text-white class="lg:w-[28px] lg:h-[28px] md:w-[28px] md:h-[28px] w-[28px] h-[28px]'}
              />
        </button>
          <p onClick={shuffleHandler}>
            <svg xmlns="http://www.w3.org/2000/svg"  class="lg:w-[32px] lg:h-[32px] md:w-[32px] md:h-[32px] w-[32px] h-[32px]" fill="#f5f0f0" viewBox="0 0 256 256"><path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L212.69,192H200.94a72.12,72.12,0,0,1-58.59-30.15l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.1,56.1,0,0,0,200.94,176h11.75l-10.35-10.34a8,8,0,0,1,11.32-11.32ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.1,56.1,0,0,1,200.94,80h11.75L202.34,90.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L212.69,64H200.94a72.12,72.12,0,0,0-58.59,30.15l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path></svg></p>
                <p onClick={adddToQueueHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[32px] lg:h-[32px] md:w-[32px] md:h-[32px] w-[32px] h-[32px]" fill="#f5f0f0" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg> </p>       
      </div>
    </div>
    </div>
  );
}
;

export default MusicPlayer ;