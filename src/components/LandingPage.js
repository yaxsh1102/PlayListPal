import React, { useState } from 'react';
import useGetTracks from '../hooks/useGetTracks';
import Navbar from './Navbar';
import Discover from './Discover';
import useNewRelease from '../hooks/useNewRelease';
import useGetArtists from '../hooks/useGetArtists'; 
import useGetToken from '../hooks/useGetToken';
import useGetPlaylist from '../hooks/useGetPlaylist';
import { useSelector } from 'react-redux';
import SearchResults from './SearchResults';
import Searchbar from './Searchbar';
import useGetPlaying from '../hooks/useGetPlaying';

const LandingPage = () => {
    const searchToggle = useSelector((store)=>store.toggle.searchToggle)
    console.log(searchToggle)

    useGetToken()
    useGetPlaylist()
    useGetPlaying()

    useGetTracks()
    useGetArtists()
    useNewRelease()

    return ( 
      <>
        <div className='flex flex-col w-full items-center bg-gradient-to-tr from-[#000000] to-[#434343] fixed h-full  '>
          {!searchToggle ? ( <><Navbar />
        <div className={`pb-[8rem] ${searchToggle ? (`pt-[12rem] `):('')} overflow-y-scroll w-[100%] flex justify-center items-center h-[90vh] overflow-x-hidden `}>
          <Discover></Discover>
         </div></>) 
         : (<><Searchbar/><SearchResults></SearchResults> </>)}
        
        </div>

      </>

    );
}

export default LandingPage