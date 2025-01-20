import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNewTracks } from "../redux/discoverSlice";
import decryptUrl from "../utils/decrypturl";

const fetchSongDetails = async (songIds) => {
  try {
     const SONG_DETAILS_ENDPOINT = 'https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids='

    const detailsUrl = `${SONG_DETAILS_ENDPOINT}${songIds}`;
    const response = await fetch(detailsUrl);
    const text = await response.text();

    const pattern = /\(From "([^"]+)"\)/g;
    const modifiedText = text.replace(pattern, (match, p1) => `(From '${p1}')`);
    const decodedText = modifiedText.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');

    const jsonResponse = JSON.parse(decodedText);

    const songsArray = Object.values(jsonResponse);
    songsArray.forEach((song) => {
      if (song.encrypted_media_url) {
        song.media_url = decryptUrl(song.encrypted_media_url); // Assuming decryptUrl is defined somewhere
      }
      if (song.singers) {
        song.singer = song?.singers?.split(',')[0];
      }
    });
    console.log(songsArray);
    return songsArray;
  } catch (err) {
    console.error("Error fetching song details:", err);
    return null;
  }
};

const useGetTracks = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((store) => store.discover.tracks);
   const SEARCH_ENDPOINT = 'https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=';

  useEffect(() => {
    const getBollywoodClassics = async () => {
      const access_token = localStorage.getItem("token");

      try {
        const searchUrl = `${SEARCH_ENDPOINT} arijit singh`;

        const response = await fetch(searchUrl);
        const text = await response.text();

        const pattern = /\(From "([^"]+)"\)/g;
        const modifiedText = text.replace(pattern, (match, p1) => `(From '${p1}')`);
        const decodedText = modifiedText.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');

        const jsonResponse = JSON.parse(decodedText);
        const songResponse = jsonResponse.songs.data;

        // Extract IDs from search results
        const songIds = songResponse.map((song) => song.id).join(',');
        console.log(songIds)

        // Fetch song details for each ID
        const songDetails = await fetchSongDetails(songIds);

        // Dispatch the fetched song details to the store
        dispatch(addNewTracks(songDetails));
      } catch (err) {
        console.error("Error fetching Bollywood classics:", err);
      }
    };

    // Only fetch if tracks are not already in the store
    if (tracks.length === 0) {
      getBollywoodClassics();
    }
    // eslint-disable-next-line
  }, []);

  return null; // Return null for this custom hook
};

export default useGetTracks;
