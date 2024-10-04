import React, { useState, useEffect } from "react";
import CreatePlaylistPopup from "./CreatePlaylistPopup";
import PlaylistCardItems from "./PlaylistCardItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../../redux/playlistSlice";
import { sendToast } from "../../redux/toastSlice";
import Loader from "../layout/Loader";

const Playlist = () => {
  const [showPopup, setShowPopup] = useState(false);
  const availablePlaylists = useSelector((store) => store.playlist.playlist);
  const [loading, setLoading] = useState(false);

  const handleCreatePlaylistClick = () => {
    setShowPopup(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlayLists() {
      setLoading(true);

      try {
        const data = await fetch(
          "https://playlistpal.onrender.com/api/v1/auth/getplayLists",
          {
            method: "GET",
            headers: {
              "Content-type": "appplication/json",
              Authorization: `Bearer ${localStorage.getItem("db_token")}`,
            },
          }
        );
        const response = await data.json();
        if (response.success) {
          const playlists = response.data.playLists.reduce((acc, playlist) => {
            acc[playlist.name.toUpperCase()] = playlist.songs.map((song) => ({
              ...song,
              url: song.preview_url,
            }));
            return acc;
          }, {});
          dispatch(setPlaylist(playlists));
          setLoading(false);
        } else {
          dispatch(sendToast("Couldn't Fetch Playlists"));
        }
      } catch (err) {
        dispatch(sendToast("Couldn't Fetch Playlists"));
      }
    }
    Object.keys(availablePlaylists).length === 0 && getPlayLists();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div className="pb-[8rem] w-full no-scrollbar flex flex-col items-center py-8 bg-gradient-to-tr from-[#000000] to-[#434343] h-[100vh] overflow-y-scroll space-y-12">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="pb-[8rem] w-full flex flex-col overflow-y-scroll h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343] no-scrollbar">
      <div className="w-full flex flex-col justify-center items-start md:pl-24">
        <h1 className="w-full xl:text-[2.5rem] text-[1.5rem] md:text-left text-center text-white  mb-8  mt-16 border-b-[3px] border-black">
          Playlists
        </h1>
        <div className="w-full flex flex-wrap mt-8 md:gap-28 gap-5 md:pr-4 md:mx-0 mx-auto md:px-0 sm:px-8 px-4 items-center justify-start">
          {Object.keys(availablePlaylists).length === 0 ? (
            <div className="w-full text-center">
              <p className="mt-[8rem] md:text-[1.4rem] text-[1rem] text-gray-300 ">
                No playlists have been created yet.{" "}
              </p>
              <button
                className="text-blue-600 text-lg underline hover:text-blue-800 "
                onClick={handleCreatePlaylistClick}
              >
                Click here to create your first playlist
              </button>
            </div>
          ) : (
            <>
              {Object.entries(availablePlaylists).map(([key, value]) => (
                <PlaylistCardItems
                  key={key}
                  imageUrl={
                    value.length
                      ? value[0].image
                      : "//music.youtube.com/img/ringo2/on_platform_logo_dark.svg"
                  }
                  playlistName={key}
                  totalSongs={value.length}
                />
              ))}
              <div
                className="lg:w-[12rem] lg:h-[18rem] w-[8rem] h-[14rem]  flex flex-col justify-center text-white items-center rounded overflow-hidden shadow-lg bg-[#191818cf] hover:scale-105"
                onClick={handleCreatePlaylistClick}
              >
                <FontAwesomeIcon className="h-[7rem]" icon={faPlus} />
                <p className="lg:text-[1.5rem] text-[1rem] text-center pt-5">
                  Create a new playlist!
                </p>
              </div>
            </>
          )}
          {showPopup && <CreatePlaylistPopup onClose={handleClosePopup} />}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
