
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
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import useGetPlaying from './hooks/useGetPlaying';
import MusicContainer from './components/MusicContainer';
import LikedSongs from './components/LikedSongs';



function App() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);


  

  useGetToken()
useGetPlaying()
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
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<LandingPage/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path = "/play-music" element={<MusicContainer></MusicContainer>}></Route>
          <Route path='/likedsongs' element={<LikedSongs></LikedSongs>}></Route>

        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
    {/* { nowPlaying && <div className='fixed bottom-4 w-[100%] right-0  h-[5rem] flex justify-center'><MusicPlayer nowPlaying={nowPlaying}></MusicPlayer></div>} */}
    </>
  );
}

export default App;
