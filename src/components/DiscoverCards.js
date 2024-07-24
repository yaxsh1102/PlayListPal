
// DiscoverCards.js
import React from 'react';

const DiscoverCards = ({ name, image, artist, genres }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let genre;
  if (genres) {
    genre = genres.slice(0, 3).map(element => `• ${capitalizeFirstLetter(element)}`).join(' ');
  }

  return (
    <div className="lg:w-[14rem] md:w-[12rem] flex-shrink-0 p-2 w-[8rem]">
      <img src={image} alt='image.png' className="lg:w-[11rem] lg:h-40 md:w-[9rem] md:h-32 w-[6rem] h-[28] object-cover rounded-md" />
      <div className="w-full lg:py-4 py-2">
        
      <p className="break-words text-white text-opacity-90 text-[0.9rem]  hidden md:block">{`• ${name} ${artist ? (" • " + artist) : (genre ? (genre) :(""))}`}</p>
        <p className="break-words text-white text-opacity-90 text-[0.7rem] font-semibold md:hidden">{artist ? (artist) :(name ? (name):(""))}</p>      </div>
        
    </div>
  );
};

export default DiscoverCards;
