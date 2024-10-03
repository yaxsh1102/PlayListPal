import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCardItems = ({ imageUrl, playlistName, totalSongs }) => {
  return (
    <Link to= {`/userplaylists/${playlistName}`} className="lg:w-[12rem] lg:h-[18rem] w-[9rem] h-[14rem]  text-white rounded overflow-hidden shadow-lg bg-[#191818cf] hover:scale-105">
      <img
        className="lg:w-full lg:h-[12rem] w-full h-[8rem]"
        src={imageUrl}
        alt={`${playlistName} cover`}
      />
      <div className="px-6 py-4">
        <div className="font-bold lg:text-xl text-md mb-2">{playlistName}</div>
        <p className="text-white text-base">
          {totalSongs} songs
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCardItems;
