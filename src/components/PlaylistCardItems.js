import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCardItems = ({ imageUrl, playlistName, totalSongs }) => {
  return (
    <Link to= {`/userplaylists/${playlistName}`} className="w-[12rem] h-[18rem]  text-white rounded overflow-hidden shadow-lg bg-[#191818cf] hover:scale-105">
      <img
        className="w-full h-[12rem] "
        src={imageUrl}
        alt={`${playlistName} cover`}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{playlistName}</div>
        <p className="text-white text-base">
          {totalSongs} songs
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCardItems;
