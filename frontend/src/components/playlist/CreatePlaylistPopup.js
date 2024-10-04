import React, { useState } from "react";
import {
  createPlaylist,
  deletePlaylist,
  renamePlaylist,
} from "../../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendToast } from "../../redux/toastSlice";

const CreatePlaylistPopup = ({ onClose, edit, old, del }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const availablePlaylists = useSelector((store) => store.playlist.playlist);
  const availablePlaylistsNames = Object.keys(availablePlaylists);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    if (del) {
      dispatch(deletePlaylist(old));
      dispatch(sendToast("Deleted Playlist " + old.toUpperCase()));
      deleteplaylist(old);
      navigate("/playlist");
      onClose();
    } else if (!playlistName.trim()) {
      setErrorMessage("Please enter a playlist name.");
    } else if (availablePlaylistsNames.includes(playlistName.toUpperCase())) {
      setErrorMessage("Playlist name already exists.");
    } else {
      setErrorMessage("");
      if (edit) {
        dispatch(
          renamePlaylist({ oldName: old, newName: playlistName.toUpperCase() })
        );
        dispatch(sendToast("Playlist Renamed"));
        renameplaylist(old.toUpperCase());
        navigate("/userplaylists/" + playlistName.toUpperCase());
        onClose();
      } else {
        dispatch(createPlaylist({ playlist: playlistName }));
        dispatch(sendToast("Created Playlist " + playlistName.toUpperCase()));
        createplaylist();
        onClose();
      }
    }
  };

  async function deleteplaylist(old) {
    try{
      const data = await fetch(
        "https://playlistpal.onrender.com/api/v1/music/deletePlaylist",
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("db_token")}`,
          },
          body: JSON.stringify({ name: old }),
        }
      );
  
      const resp = await data.json();
      console.log(resp);
      if (!resp.success) {
        // dispatch(sendToast("Couldn't delete  Playlist "+ playlistName.toUpperCase()))
      }

    }catch(err){

    }
   
  }

  async function createplaylist() {

    try{
    const data = await fetch(
      "https://playlistpal.onrender.com/api/v1/music/createPlaylist",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("db_token")}`,
        },
        body: JSON.stringify({ name: playlistName }),
      }
    );

    const resp = await data.json();
    console.log(resp);
    if (!resp.success) {
      dispatch(
        sendToast("Couldn't Create  Playlist " + playlistName.toUpperCase())
      );
    }
  }catch(err){
    
  }
  }

  async function renameplaylist(old) {

    try{
    const data = await fetch(
      "https://playlistpal.onrender.com/api/v1/music/renamePlaylist",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("db_token")}`,
        },
        body: JSON.stringify({
          oldName: old.toUpperCase(),
          newName: playlistName.toUpperCase(),
        }),
      }
    );
  }catch(err){

  }
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-gradient-to-tr from-[#1b1a1a] to-[#222020] p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-[1.5rem] text-white font-semibold mb-4">
            {del
              ? "Are you sure you want to delete this playlist ?"
              : edit
              ? "Edit playlist's name "
              : "Create Playlist"}
          </h2>
          {!del ? (
            <>
              <input
                type="text"
                className="w-full px-3 py-2 mb-4 rounded bg-[#4e4b48] outline-none text-white"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
            </>
          ) : (
            ""
          )}
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              onClick={handleCreateClick}
            >
              {del ? "Delete" : edit ? "Edit Name" : "Create Playlist"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylistPopup;
