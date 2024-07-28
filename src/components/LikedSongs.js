import React from 'react';
import { useSelector } from 'react-redux';
import Searchitems from './SearchItems';
import "../App.css"

const LikedSongs = () => {
  const likedSongs = useSelector((state) => state.playlist.likedSongs || []);

  return (
    <div className="pb-[8rem] w-full flex flex-col h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343]">
      <div className='w-full flex flex-col justify-center items-start md:pl-24 '>
        <h1 className="w-full md:text-[3rem] text-[1rem] md:text-left text-center text-white  mb-2 
        mt-10 border-b-[3px] border-black sticky ">
          Liked Songs
        </h1>
        <div className="w-full md:w-[80%] overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(100vh - 14rem)' }}>
          {likedSongs.length === 0 ? (
            <p className="mt-[8rem] text-[1rem] text-gray-300 pl-[22rem]">No liked songs yet.</p>
          ) : (
            likedSongs.map((song, index) => (
              <Searchitems
                key={index}
                image={song.image}
                name={song.name}
                artist={song.artist}
                duration={song.duration}
                singer={song.singer}
                type={song.type}
                url={song.url}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;

