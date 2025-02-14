import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchResults } from "../../redux/userSlice";
import MatchCard from "./MatchCard";
import Loader from "../layout/Loader";
import { sendToast } from "../../redux/toastSlice";
import { setCoordinates } from "../../redux/userSlice";

const MatchLanding = ({ setsetSelectedOption }) => {
  const [loading, setLoading] = useState(false);
  const matchResults = useSelector((store) => store.user.matchResults);
  const dispatch = useDispatch();
  const { lat, lon, isProfileCompleted } = useSelector((store) => store.user);

  const ref = useRef({
    playLists: false,
    likedSongs: false,
    radius: 0,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
        },
        (error) => {
          dispatch(sendToast("Location Is Mandatory"));
        }
      );
    } else {
      dispatch(sendToast("Location Is Mandatory"));
    }
  };


  async function matchHandler() {
    if (!lat || !lon) {
      getLocation();
      return;
    }

    // if (!isProfileCompleted) {
    //   dispatch(sendToast("Incomplete Profile"));
    //   return;
    // } 


    if((!ref.current["likedSongs"].checked && !ref.current["playLists"].checked) || !ref.current['radius'].value){
      dispatch(sendToast("Incomplete Fields"))
      return 
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://playlistpal.onrender.com/api/v1/match/getMatches",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("db_token")}`,
          },
          body: JSON.stringify({
            playLists: ref.current["playLists"].checked,
            likedSongs: ref.current["likedSongs"].checked,
            radius: ref.current["radius"].value,
            lat: lat,
            lon: lon,
          }),
        }
      );

      const results = await response.json();
      if (results.success) {
        dispatch(setMatchResults(results.data));
        setsetSelectedOption("find-match");
      } else {
        dispatch(sendToast(results.message));
        
      }
    } catch (error) {
      dispatch(sendToast("Error Occured"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : matchResults && matchResults.length > 0 ? (
        <MatchCard selectedOption={"find-match"} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[90%] p-6 text-white">
          <h1 className="lg:text-4xl md:text-2xl text-center font-light tracking-wide mb-8">
            Uniting Hearts, Discover Connections Through Shared{" "}
            <span className="text-indigo-500">Musical Harmonies</span>
          </h1>
          <p className="lg:text-2xl md:text-xl text-center mb-6">
            Pick Your Favorites to Find Your Perfect Match
          </p>
          <div className="w-full max-w-xs">
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  ref={(el) => {
                    ref.current["playLists"] = el;
                  }}
                  className="w-8 h-8 appearance-none bg-gray-800 border-2 border-gray-400 checked:bg-gray-800 checked:border-gray-700 checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:left-2 checked:after:top-1/2 checked:after:-translate-y-1/2 focus:ring-0 relative"
                />
                <span className="ml-4 text-lg">Playlist</span>
              </label>
            </div>
            <div className="mb-8">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  ref={(el) => {
                    ref.current["likedSongs"] = el;
                  }}
                  className="w-8 h-8 appearance-none bg-gray-800 border-2 border-gray-400 rounded-sm checked:bg-gray-800 checked:border-gray-700 checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:left-2 checked:after:top-1/2 checked:after:-translate-y-1/2 focus:ring-0 relative"
                />
                <span className="ml-4 text-lg">Liked Songs</span>
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-lg font-medium mb-2"
                htmlFor="distance-radius"
              >
                Add Distance Radius (in kms)
              </label>
              <input
                type="text"
                ref={(el) => {
                  ref.current["radius"] = el;
                }}
                id="distance-radius"
                className="w-full px-3 py-2 rounded bg-gray-800 outline-none text-slate-400"
                placeholder="Enter radius"
              />
            </div>
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={matchHandler}
            >
              Find My Match
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchLanding;
