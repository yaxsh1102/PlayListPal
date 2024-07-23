// App.js
import './App.css';
import { useEffect } from 'react';
import useGetTracks from './hooks/useGetTracks';
import useNewRelease from './hooks/useNewRelease';
import useGetArtists from './hooks/useGetArtists';
import useGetPlaylist from './hooks/useGetPlaylist';
import LandingPage from './components/LandingPage';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Playlist from './components/Playlist';
import LikedSongs from './components/LikedSongs';

function App() {

  useGetTracks()
  useGetPlaylist()
  useGetArtists()
  useNewRelease()

  useEffect(() => {
} ,[])

  return (
<>
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<LandingPage/>}/>
          <Route path='profile' element={<Profile/>}/>
          {/* <Route path='playlist' element={<Playlist/>}/> */}
          <Route path='likedsongs' element={<LikedSongs/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
 