import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Searchitems from "../search/SearchItems";
import "../../App.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import CreatePlaylistPopup from "./CreatePlaylistPopup";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setLikedSongs } from "../../redux/playlistSlice";
import { setHistory } from "../../redux/playerSlice";
import { sendToast } from "../../redux/toastSlice";
import Loader from "../layout/Loader";

const DisplayPlaylist = ({ type }) => {
  const { param } = useParams();
  const navigate = useNavigate();
  const name = decodeURIComponent(param);
  const userplaylists = useSelector((store) => store.playlist.playlist);
  const likedsongs = useSelector((store) => store.playlist.likedSongs || []);
  const albums = useSelector((store) => store.discover.albums);
  const artists = useSelector((store) => store.discover.artists);
  const playlists = useSelector((store) => store.discover.playlists);
  const history = useSelector((store) => store.player.history);
  const resAlbums = useSelector((store) => store.result.albums);
  const currentPlaylist = getCurrentPlaylist(type, name) || "NOTFOUND";
  const heading =
    type === "likedsong"
      ? "Liked songs"
      : type === "history"
      ? "History"
      : name;
  const subHeading =
    type === "likedsong"
      ? "No liked songs yet."
      : type === "history"
      ? "Songs played in past will be displayed here"
      : "This playlist is empty ! ";


  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const isUserPlaylist = location.pathname.split("/")[1] === "userplaylists";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getLikedOrHistory() {
      setLoading(true);

      try {
        const data = await fetch(
          "https://playlistpal.onrender.com/api/v1/auth/getLikedOrHistory",
          {
            method: "GET",
            headers: {
              "Content-type": "appplication/json",
              Authorization: `Bearer ${localStorage.getItem("db_token")}`,
            },
          }
        );
        const resp = await data.json();
        if (resp.success) {
          const likedSongs = resp.data.likedSongs.map((song) => ({
            ...song,
            url: song.preview_url,
            preview_url: undefined,
          }));

          dispatch(setLikedSongs(likedSongs));
          dispatch(setHistory(resp.data.history));
          setLoading(false);
        } else {
          dispatch(sendToast("Error While Fetching"));
        }
      } catch (err) {
        dispatch(sendToast("Error While Fetching"));
      }
    }
    likedsongs.length === 0 && history.length === 0 && getLikedOrHistory();
  }, []);

  function getCurrentPlaylist(type, name) {
    try {
      switch (type) {
        case "userplaylist":
          return userplaylists[name];
        case "likedsong":
          return likedsongs;
        case "album":
          return albums[name].songs;
        case "artist":
          return artists[name].songs;
        case "playlist":
          return playlists[name].songs;
        case "result":
          return resAlbums[name].songs;
        case "history":
          return history;
        default:
          return null;
      }
    } catch (err) {
      return null;
    }
  }

  const [showPopup, setShowPopup] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setShowPopup(true);
  };

  console.log(type);

  if (loading) {
    return (
      <div className="pb-[8rem] w-full no-scrollbar flex flex-col items-center py-8 bg-gradient-to-tr from-[#000000] to-[#434343] h-[100vh] overflow-y-scroll space-y-12">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343]">
      {!currentPlaylist ? (
        <Spinner />
      ) : currentPlaylist === "NOTFOUND" ? (
        navigate("/playlist")
      ) : (
        <div className="w-full flex flex-col justify-center items-start md:pl-24 ">
          <div className="flex w-full border-b-[3px] border-black sticky">
            <h1
              className="w-full md:text-[2rem] text-[1.5rem] md:text-left text-right text-white mb-1
        mt-10"
            >
              {heading}
            </h1>
            {isUserPlaylist && (
              <div className="w-full flex justify-end items-center pr-4 md:pr-16 text-white gap-4 md:gap-8 pt-10">
                <button
                  className="flex items-center gap-1 text-sm md:text-base"
                  onClick={handleEdit}
                >
                  <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />{" "}
                  <span>Edit</span>
                </button>
                <button
                  className="flex items-center gap-1 text-sm md:text-base"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />{" "}
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
          <div
            className="w-full pb-[5rem] md:w-[80%] overflow-y-auto no-scrollbar "
            style={{ maxHeight: "calc(100vh - 14rem)" }}
          >
            {currentPlaylist.length === 0 ? (
              <p className="mt-20 md:mt-[12rem] text-center md:text-left text-[1.5rem] md:text-[3rem] text-gray-300">
                {subHeading}
              </p>
            ) : (
              currentPlaylist.map((song, index) => (
                <Searchitems
                  key={index}
                  image={song.image}
                  name={song.name}
                  artist={song.artist}
                  duration={song.duration}
                  singer={song.singer}
                  type={null}
                  url={song.url}
                />
              ))
            )}

            {showPopup && (
              <CreatePlaylistPopup
                onClose={handleClosePopup}
                edit={isEditing}
                old={name}
                del={isDeleting}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPlaylist;
