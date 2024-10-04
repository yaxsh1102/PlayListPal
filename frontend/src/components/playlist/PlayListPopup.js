import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { addToPlaylist, createPlaylist } from "../../redux/playlistSlice";
import { sendToast } from "../../redux/toastSlice";

const PlayListPopup = ({
  oldPlayList,
  setOldPlaylist,
  setShowAddToPlayList,
  setShowCenterPopup,
  setShowPopup,
  setPopupMessage,
}) => {
  const playlist = useSelector((store) => store.playlist.playlist);
  const selectedSong = useSelector((store) => store.playlist.selectedSong);
  const [errorMessage, setErrorMessage] = useState("");
  const [songStatus, setSongStatus] = useState({});
  const inp = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const status = {};
    Object.keys(playlist).forEach((option) => {
      status[option] = playlist[option].some(
        (song) => song.name === selectedSong.name
      );
    });
    setSongStatus(status);
  }, [playlist, selectedSong]);

  function submitHandler(e) {
    e.preventDefault();
    const newPlaylistName = inp.current.value.trim().toUpperCase();

    if (Object.keys(playlist).includes(newPlaylistName)) {
      setErrorMessage("Playlist already exists");
      return;
    }
    if (!inp.current.value.trim()) {
      setErrorMessage("Please Enter a Valid Name");
      return;
    }
    setOldPlaylist(!oldPlayList);
    setErrorMessage("");
    dispatch(createPlaylist({ playlist: inp.current.value }));
  }

  function clickHandler() {
    setShowAddToPlayList(false);
    setShowCenterPopup(true);
  }

  function toPlaylist(name) {
    dispatch(addToPlaylist({ playlist: name, song: selectedSong }));
    dispatch(sendToast("Song Added to " + name));
    setShowAddToPlayList(false);
    const playlistName = name;
    addtoPlaylist(playlistName);
  }

  async function addtoPlaylist(playlistName) {
    try {
      const { url, image, singer, artist, name } = selectedSong;

      const data = await fetch(
        "https://playlistpal.onrender.com/api/v1/music/addToPlaylist",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("db_token")}`,
          },
          body: JSON.stringify({
            preview_url: url,
            image,
            singer,
            artist,
            name,
            playlistName: playlistName,
          }),
        }
      );
    } catch (err) {}
  }

  return (
    <>
      {oldPlayList ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 shadow-lg rounded-lg z-50 h-[20rem] w-[16rem] flex flex-col items-stretch bg-[#191919] text-slate-200">
          <button onClick={clickHandler} className="flex justify-end pr-4 pb-4">
            <FaTimes className="w-4 h-4 text-slate-200" />
          </button>
          <div className="flex flex-col justify-center">
            <div
              className="flex w-full gap-x-2 px-6 border-b-[2px] py-3 border-b-slate-600 hover:bg-gray-800 "
              onClick={() => setOldPlaylist(false)}
            >
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                </svg>
              </p>
              <p className="text-white">New Playlist</p>
            </div>
            <div className="my-2 w-full overflow-x-scroll h-[14rem] no-scrollbar">
              {playlist ? (
                Object.keys(playlist).map((option, index) => {
                  const isSongAlreadyAdded = songStatus[option];

                  return (
                    <p
                      className={`px-8 text-xl py-2 w-full flex justify-between items-center hover:bg-gray-800 border-b-[0.5px] border-b-slate-600 ${
                        isSongAlreadyAdded
                          ? "pointer-events-none bg-gray-600"
                          : ""
                      }`}
                      onClick={() => !isSongAlreadyAdded && toPlaylist(option)}
                      key={index}
                    >
                      <span>{option}</span>
                      <span className="text-sm">
                        {playlist[option].length} Songs
                        {isSongAlreadyAdded ? " (Added)" : ""}
                      </span>
                    </p>
                  );
                })
              ) : (
                <p className="text-center w-full">No Playlist Found :</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 shadow-lg rounded-lg z-50 sm:h-[20rem] sm:w-[24rem] h-[16rem] w-[20rem] flex flex-col bg-[#191919] text-slate-200"
          onSubmit={submitHandler}
        >
          <button
            className="flex justify-end pr-4 pb-4"
            onClick={() => setOldPlaylist(!oldPlayList)}
          >
            <FaTimes className="w-4 h-4 text-slate-200" />
          </button>
          <div className="w-full flex flex-col justify-center items-center">
            <p className="sm:w-[90%] w-[70%] px-1 ">Enter PlayList's Name</p>
            <input
              type="text"
              className="sm:w-[90%] w-[70%] px-3 py-2 mt-4 text-white outline-none bg-[#4e4b48] border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="New Playlist"
              ref={inp}
            />
            <p className="sm:w-[90%] w-[70%] px-1 pt-4 text-red-600 ">
              {errorMessage}
            </p>
          </div>
          <button
            className="sm:w-[60%] w-[45%] h-[3rem] mx-auto bg-[#232323] my-auto hover:bg-[#3f3f3f] rounded-sm"
            type="submit"
          >
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default PlayListPopup;
