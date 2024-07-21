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



function App() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);


  

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
    <LandingPage></LandingPage>
 
  );
}

export default App;
 