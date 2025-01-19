import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { initiateQueue } from "../redux/playerSlice";
import { addNewTracks } from "../redux/discoverSlice"; // Assuming you're using the same action for tracks

import decryptUrl from "../utils/decrypturl";

// Function to fetch song details
const fetchSongDetails = async (songIds) => {
  try {
    const SONG_DETAILS_ENDPOINT = 'https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=';

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

const useGetPlaying = () => {
  const dispatch = useDispatch();
  const SEARCH_ENDPOINT = 'https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=';

  useEffect(() => {
    const searchHindiSongs = async () => {
      const query = 'bollywood hits'; // Searching for Hindi songs

      try {
        // Perform the search query
        const searchUrl = `${SEARCH_ENDPOINT}${query}`;
        const response = await fetch(searchUrl);
        const text = await response.text();

        // Modify text as needed, similar to your pattern
        const pattern = /\(From "([^"]+)"\)/g;
        const modifiedText = text.replace(pattern, (match, p1) => `(From '${p1}')`);
        const decodedText = modifiedText.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');

        const jsonResponse = JSON.parse(decodedText);
        const songResponse = jsonResponse.songs.data;

        // Extract song IDs from the search results
        const songIds = songResponse.map((song) => song.id).join(',');

        // Fetch song details for each ID
        const songDetails = await fetchSongDetails(songIds);

        // Prepare data in the expected format for the queue
        console.log(songDetails)
        const arr = songDetails.map((song) => {
          return {
            name: song.song,
            url: song.media_url,
            image: song.image, // Assuming image is part of the response
            singer: song.singers.split(',')[0],
          };
        });

        // Dispatch the songs to the Redux store (initiate the queue)
        dispatch(initiateQueue(arr));

      } catch (err) {
        console.error("Error fetching Hindi songs:", err);
      }
    };

    // Only fetch if tracks are not already in the store (avoid duplicate fetching)
    searchHindiSongs();

    // eslint-disable-next-line
  }, []);

  return null; // Return null for this custom hook
};

export default useGetPlaying;
