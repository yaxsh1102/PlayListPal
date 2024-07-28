import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Searchitems from './SearchItems';
import CreatePlaylistPopup from './CreatePlaylistPopup';
import useGetUserPlaylist from '../hooks/useGetUserPlaylist';
import PlaylistCardItems from './PlaylistCardItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "../App.css"

const Playlist = () => {
  const [showPopup, setShowPopup] = useState(false);
  const availablePlaylists = useGetUserPlaylist();

  const handleCreatePlaylistClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="pb-[8rem] w-full flex flex-col overflow-y-scroll h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343] no-scrollbar">
      <div className='w-full flex flex-col justify-center items-start md:pl-24'>
        <h1 className="w-full xl:text-[2.5rem] text-[1.5rem] md:text-left text-center text-white  mb-8 mt-16 border-b-[3px] border-black">Playlists</h1>
        <div className="w-full flex flex-wrap mt-8 md:gap-28 gap-5 md:pr-40  md:mx-0 mx-auto">
          {Object.keys(availablePlaylists).length === 0 ? (<div className='w-full text-center'>
            <p className="mt-[8rem] md:text-[1.4rem] text-[1rem] text-gray-300 ">No playlists have been created yet. </p>
              <button className="text-blue-600 text-lg underline hover:text-blue-800 " onClick={handleCreatePlaylistClick}>Click here to create your first playlist</button>
            </div>
          ) : (
            <>
              {Object.entries(availablePlaylists).map(([key, value]) => (
                <PlaylistCardItems
                  key={key}
                //   imageUrl="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  imageUrl={value.length ? value[0].image : "//music.youtube.com/img/ringo2/on_platform_logo_dark.svg" }
                  playlistName={key}
                  totalSongs={value.length}
                />
              ))}
              <div className="w-[12rem] h-[18rem] flex flex-col justify-center text-white items-center rounded overflow-hidden shadow-lg bg-[#191818cf] hover:scale-105"
                   onClick={handleCreatePlaylistClick}>
                <FontAwesomeIcon className="h-[7rem]" icon={faPlus} />
                <p className="text-[1.5rem] text-center pt-5">Create a new playlist!</p>
              </div>
            </>
          )}
          {showPopup && (
            <CreatePlaylistPopup
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
