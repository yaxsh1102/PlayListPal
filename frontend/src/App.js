import React from "react";
import "./App.css";
import useGetToken from "./hooks/useGetToken";
import Home from "./components/home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Profile from "./components/profile/Profile";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import MusicContainer from "./components/player/MusicContainer";
import Playlist from "./components/playlist/Playlist";
import DisplayPlaylist from "./components/playlist/DisplayPlaylist";
import { Toaster } from "react-hot-toast";
import Match from "./components/match/Match";
import LandingPage from "./components/layout/LandingPage";

function App() {
  useGetToken();

  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="play-music" element={<MusicContainer />} />
            <Route path="matches" element={<Match />} />
            <Route
              path="likedsongs"
              element={<DisplayPlaylist type={"likedsong"} />}
            />
            <Route
              path="history"
              element={<DisplayPlaylist type={"history"} />}
            />
            <Route path="playlist" element={<Playlist />} />
            <Route
              path="userplaylists/:param"
              element={<DisplayPlaylist type={"userplaylist"} />}
            />
            <Route
              path="albums/:param"
              element={<DisplayPlaylist type={"album"} />}
            />
            <Route
              path="artists/:param"
              element={<DisplayPlaylist type={"artist"} />}
            />
            <Route
              path="playlists/:param"
              element={<DisplayPlaylist type={"playlist"} />}
            />
            <Route
              path="result/:param"
              element={<DisplayPlaylist type={"result"} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
