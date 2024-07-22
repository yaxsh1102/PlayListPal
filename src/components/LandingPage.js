import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
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

const LandingPage = () => {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const searchToggle = useSelector((store)=>store.toggle.searchToggle)
    console.log(searchToggle)

    useGetToken()
    useGetTracks()
    useGetPlaylist()
    useGetArtists()
    useNewRelease()
  
    useEffect(() => {
  
 
  
  
  
  
  
  } ,[])
  
  
    
  
    const toggleSearchBarVisibility = () => {
      setIsSearchBarVisible(!isSearchBarVisible);
    };
  
    return ( 
      <>
        <div className='flex flex-col w-full items-center bg-gradient-to-tr from-[#000000] to-[#434343] fixed h-full'>
          {!searchToggle ? ( <><Navbar />
        <div className='pb-[8rem] overflow-y-scroll w-[100%]  flex justify-center items-center h-[90vh] overflow-x-hidden '> 
          <Discover></Discover>
         </div></>) 
         : (<><Searchbar/><SearchResults></SearchResults> </>)}
        
        </div>

      </>

    );
}

export default LandingPage