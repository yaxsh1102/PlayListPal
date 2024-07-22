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
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import MusicPlayer from './components/MusicPlayer';
import { useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const nowPlaying = useSelector((store)=>store.player.nowPlaying)


  

  // useGetToken()
  useGetTracks()
  useGetPlaylist()
  useGetArtists()
  useNewRelease()

  useEffect(() => {

 

  //   const handleSearch = async () => {
  //     if (access_token ) {
  //       const response = await axios.get(SEARCH_ENDPOINT, {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //         params: {
  //           q: "Baller",
  //           type: 'album,artist,track', // Specify all types

            
  //         },
  //       });
  //       console.log(response)
  //       const obj = {
  //         album:response.data.albums ,
  //         artists:response.data.artists ,
  //         tracks :response.data.tracks 
  //       }

  //       console.log(obj)

  //       dispatch(addResult(obj))

  //     }

  // };





} ,[])


  

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
 