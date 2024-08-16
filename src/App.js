
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
import LikedSongs from './components/DisplayPlaylist';
import Playlist from './components/Playlist';
import DisplayPlaylist from './components/DisplayPlaylist';
import { Toaster,toast } from 'react-hot-toast';


function App() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  useGetToken()
  useGetPlaylist()
  useGetPlaying()
  useGetTracks()
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
          <Route path = "play-music" element={<MusicContainer/>}></Route>
          <Route path="likedsongs" element={<DisplayPlaylist type={'likedsong'}/>}/>
          <Route path="playlist" element={<Playlist/>}/>
          <Route path='userplaylists/:param' element={<DisplayPlaylist type={'userplaylist'} />} />
          <Route path='albums/:param' element={<DisplayPlaylist type={'album'} />} />
          <Route path='artists/:param' element={<DisplayPlaylist type={'artist'} />} />
          <Route path='playlists/:param' element={<DisplayPlaylist type={'playlist'} />} />
          <Route path='result/:param' element={<DisplayPlaylist type={'result'} />} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      <Toaster/>
    </Router>
    {/* { nowPlaying && <div className='fixed bottom-4 w-[100%] right-0  h-[5rem] flex justify-center'><MusicPlayer nowPlaying={nowPlaying}></MusicPlayer></div>} */}
    </>
  );
}

export default App;
