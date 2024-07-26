import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addNewPlaylist } from '../redux/discoverSlice';

const useGetPlaylist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNewReleases = async () => {
      const access_token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
         
        });
        const playlists = response.data.playlists.items;
        console.log(playlists )

        const playlistsWithTracks = await Promise.all(
          playlists.map(async (playlist) => {
            const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              params:{
                limit:10 ,
              }
            });

            const tracks = tracksResponse.data.items.map((item) => item.track);

            return { playlist, tracks };
          })
        );
        console.log(playlistsWithTracks)

        dispatch(addNewPlaylist({ playlistsWithTracks }));
      } catch (err) {
        console.error('Error fetching playlists:', err.response ? err.response.data : err.message);
      }
    };

    getNewReleases();
  }, []);

  return null;
};

export default useGetPlaylist;
