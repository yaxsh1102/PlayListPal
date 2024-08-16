import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewArtists, setLoading } from "../redux/discoverSlice";

const useGetArtists = () => {
  const dispatch = useDispatch();
  dispatch(setLoading(true));

  const getRandomQuery = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  useEffect(() => {
    const getNewArtists = async () => {
      const access_token = localStorage.getItem("token");
      const randomQuery = getRandomQuery();

      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: randomQuery,
            type: 'artist',
            limit: 5,
          },
        });

        const artistsWithTracks = await Promise.all(
          response.data.artists.items.map(async (artist) => {
            const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              }
             
            });
            const tracks = tracksResponse.data.tracks;

            return { artist, tracks };
          })
        );

        dispatch(addNewArtists({ artistsWithTracks }));
      } catch (err) {
        console.error("Error fetching artists:", err.response ? err.response.data : err.message);
      }
      finally{
        dispatch(setLoading(false));
      }
    };

    getNewArtists();
     // eslint-disable-next-line
  }, []);
};

export default useGetArtists;