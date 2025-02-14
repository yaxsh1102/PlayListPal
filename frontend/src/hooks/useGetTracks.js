import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTracks } from "../redux/discoverSlice";

const useGetTracks = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((store) => store.discover.tracks);
  const SEARCH_ENDPOINT = "https://playlist-pal.duckdns.org/streaming/result/?query=";

  useEffect(() => {
    const getBollywoodClassics = async () => {
      try {
        const searchUrl = `${SEARCH_ENDPOINT}arijit singh`;
        const response = await fetch(searchUrl);
        const jsonResponse = await response.json();

        // Assuming jsonResponse.songs contains the song details directly
        const songResponse = jsonResponse;

        if (!songResponse || songResponse.length === 0) {
          console.warn("No songs found for the query.");
          return;
        }

        // Process the songs before dispatching
        const processedSongs = songResponse.map((song) => {
          return {
            ...song,
            singer: song?.singers?.split(",")[0] || "Unknown",
            // Skip decrypting the media URL
            media_url: song.media_url,
          };
        });

        // Dispatch the processed songs to the store
        dispatch(addNewTracks(processedSongs));
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
