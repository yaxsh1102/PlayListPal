import React from 'react'
import { useDispatch } from 'react-redux';
import { addNewPlaylist } from '../redux/discoverSlice';
import axios from 'axios';
import { useEffect } from 'react';

const useGetPlaylist =  () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getNewReleases = async () => {
          const access_token=localStorage.getItem("token")

    
          try {
            const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists ', {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            });
            dispatch(addNewPlaylist(response.data.playlists.items))
            console.log(response.data.playlists.item)
            

        
          } catch (err) {
            console.error("Error fetching new releases:", err.response ? err.response.data : err.message);
          }
        };
    
        getNewReleases();
      }, []);


}

export default useGetPlaylist

