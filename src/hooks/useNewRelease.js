import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewAlbums } from "../redux/discoverSlice";

const useNewRelease = () => {
  const dispatch = useDispatch() 


  useEffect(() => {
    const getNewReleases = async () => {
      const access_token=localStorage.getItem("token")


      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        dispatch(addNewAlbums(response.data.albums.items))

      } catch (err) {
        console.error("Error fetching new releases:", err.response ? err.response.data : err.message);
      }
    };

    getNewReleases();
  }, []);

};

export default useNewRelease;
