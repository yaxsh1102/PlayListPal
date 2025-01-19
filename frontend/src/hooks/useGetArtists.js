import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNewArtists } from "../redux/discoverSlice";

const useGetArtists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((store)=>store.discover.artists)

  const getRandomQuery = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };
//https://jiosaavnapi-0w6h.onrender.com
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
            limit: 4,
          },
        });
  
        const artistsWithTracks = await Promise.all(
          response.data.artists.items.map(async (artist) => {
            const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              params: {
                limit: 4,  
                country: 'IN',  
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
    };
  
    !Object.keys(artists).length  && getNewArtists();
  }, []);
}
  

export default useGetArtists;