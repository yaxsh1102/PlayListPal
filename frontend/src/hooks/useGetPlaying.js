import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initiateQueue } from "../redux/playerSlice";

const useGetPlaying = () => {
  const dispatch = useDispatch();
  const SEARCH_ENDPOINT = "https://playlist-pal.duckdns.org/streaming/result/?query=";

  useEffect(() => {
    const searchHindiSongs = async () => {
      const query = "pritam"; // Searching for Hindi songs

      try {
        // Perform the search query
        const searchUrl = `${SEARCH_ENDPOINT}${query}`;
        const response = await fetch(searchUrl);
        const jsonResponse = await response.json();

        // Assuming jsonResponse.songs contains the song details directly
        const songResponse = jsonResponse;

        if (!songResponse || songResponse.length === 0) {
          console.warn("No songs found for the query.");
          return;
        }

        // Prepare data for the queue
        const arr = songResponse.map((song) => {
          return {
            name: song.song, // Assuming 'song' contains the title
            url: song.media_url, // Use the direct media URL
            image: song.image, // Assuming image is part of the response
            singer: song?.singers?.split(",")[0] || "Unknown", // Extract the first singer
          };
        });

        // Dispatch the songs to the Redux store (initiate the queue)
        dispatch(initiateQueue(arr));

      } catch (err) {
        console.error("Error fetching Hindi songs:", err);
      }
    };

    // Fetch songs when the hook is used
    searchHindiSongs();

    // eslint-disable-next-line
  }, []);

  return null; // Return null for this custom hook
};

export default useGetPlaying;
