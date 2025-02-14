import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addNewPlaylist } from '../redux/discoverSlice';
import {extractPlaylistId} from '../utils/extractUrl';

const useGetPlaylist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((store) => store.discover.playlists);

  const links = [
    'https://www.jiosaavn.com/featured/best-of-romance-hindi/SBKnUgjNeMIwkg5tVhI3fw__',
    'https://www.jiosaavn.com/featured/best-of-sad-songs-2000s/KQaWtlmKQuQwkg5tVhI3fw__',
    'https://www.jiosaavn.com/featured/lets-play-arijit-singh-hindi/Iz0pi7nkjUE_',
    'https://www.jiosaavn.com/featured/best-of-2010s/gn19HTwL-lfgEhiRleA1SQ__',
    'https://www.jiosaavn.com/featured/non-stop-party/FPfWwWPUJ5I_'
  ];

  useEffect(() => {
    const getNewReleases = async () => {
      const access_token = localStorage.getItem('token');

      try {
        const playlistData = await Promise.all(
          links.map(async (link) => {
           

            const jiosaavnResponse = await axios.get(`http://127.0.0.1:5100/result/?query=${link}`);
            console.log(jiosaavnResponse)


           

            const playlist =  {name:jiosaavnResponse.data?.listname , image:jiosaavnResponse.data.image }
            return { playlist, tracks:jiosaavnResponse.data.songs };


          })
        );

        dispatch(addNewPlaylist({ playlistsWithTracks: playlistData }));
      } catch (err) {
        console.error('Error fetching playlists', err);
      }
    };

    if (!Object.keys(playlists).length) {
      getNewReleases();
    }
  }, [dispatch, playlists]);

  return null;
};

export default useGetPlaylist;
