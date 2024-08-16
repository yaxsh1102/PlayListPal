import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addNowPlaying } from '../redux/playerSlice';

const DiscoverCards = ({ name, image, artist, genres , type , url}) => {
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  function handleClick(){
    const singer = artist ;
    const nowPlayingObj = {name , image , url ,singer}
    dispatch(addNowPlaying(nowPlayingObj))
    navigate("play-music") 
    
  }

  let genre;
  if (genres) {
    genre = genres
      .filter(element => typeof element === 'string' && element.trim() !== '')
      .slice(0, genres.length) 
      .map(element => `• ${capitalizeFirstLetter(element)}`)
      .join(' ');
  }

  return (<>{ type==="tracks" ? (
    <div className="lg:w-[14rem] md:w-[12rem] flex-shrink-0 p-2 w-[8rem]"
          onClick={type === "tracks" ? handleClick : undefined}>      
        <img src={image} alt='image.png' className="lg:w-[11rem] lg:h-40 md:w-[9rem] md:h-32 w-[6rem] h-[28] object-cover rounded-md" />
        <div className="w-full lg:py-4 py-2">
          <p className="break-words text-white text-opacity-90 text-[0.9rem]  hidden md:block">{`• ${name} ${artist ? (" • " + artist) : (genre ? (genre) :(""))}`}</p>
          <p className="break-words text-white text-opacity-90 text-[0.7rem] font-semibold md:hidden">{artist ? (artist) :(name ? (name):(""))}</p>      
        </div>
    </div>
  ) : (
    <Link to={`/${type}/${name}`} className="lg:w-[14rem] md:w-[12rem] flex-shrink-0 p-2 w-[8rem]"
          onClick={type === "tracks" ? handleClick : undefined}>      
          <img src={image} alt='image.png' className="lg:w-[11rem] lg:h-40 md:w-[9rem] md:h-32 w-[6rem] h-[28] object-cover rounded-md" />
          <div className="w-full lg:py-4 py-2">
            <p className="break-words text-white text-opacity-90 text-[0.9rem]  hidden md:block">{`• ${name} ${artist ? (" • " + artist) : (genre ? (genre) :(""))}`}</p>
            <p className="break-words text-white text-opacity-90 text-[0.7rem] font-semibold md:hidden">{artist ? (artist) :(name ? (name):(""))}</p>      
          </div>
    </Link>
  )
  }</>
  );
};

export default DiscoverCards;