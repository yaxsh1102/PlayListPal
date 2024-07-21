// App.js
import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import useGetTracks from './hooks/useGetTracks';
import useNewRelease from './hooks/useNewRelease';
import useGetArtists from './hooks/useGetArtists';
import useGetToken from './hooks/useGetToken';
import useGetPlaylist from './hooks/useGetPlaylist';
import LandingPage from './components/LandingPage';
import MusicPlayer from './components/MusicPlayer';
import Searchbar from './components/Searchbar';
import { useSelector } from 'react-redux';



function App() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const nowPlaying = useSelector((store)=>store.player.nowPlaying)


  

  useGetToken()
  useGetTracks()
  useGetPlaylist()
  useGetArtists()
  useNewRelease()

 


  

  // Function to toggle search bar visibility
  const toggleSearchBarVisibility = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <>
    <LandingPage></LandingPage>
  </>
 
  );
}

export default App;
 