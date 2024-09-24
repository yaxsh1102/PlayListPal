import  { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import { addNewPlaylist, setLoading } from '../redux/discoverSlice';

const useGetPlaylist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((store)=>store.discover.playlists)
  const isTokenReady = ((store)=>store.discover.isTokenReady)


  dispatch(setLoading(true));

  useEffect(() => {
    const getNewReleases = async () => {
      const access_token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            limit: 6
          }
        });
        const playlists = response.data.playlists.items;

        const playlistsWithTracks = await Promise.all(
          playlists.map(async (playlist) => {
            const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              params: {
                limit: 8,
              }
            });

            const tracks = tracksResponse.data.items.map((item) => item.track);
            return { playlist, tracks };
          })
        );

        dispatch(addNewPlaylist({ playlistsWithTracks }));
      } catch (err) {
        console.error('Error fetching playlists:', err.response ? err.response.data : err.message);
      }
      finally{
        dispatch(setLoading(false));
      }
    };

    !Object.keys(playlists).length && isTokenReady  && getNewReleases();

  }, []);

  return null;
};

export default useGetPlaylist;
