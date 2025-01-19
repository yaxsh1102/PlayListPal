import axios from "axios";
import { useDispatch } from "react-redux";
import { addAlbums, addTracks } from "../../redux/resultsSlice";
import { useEffect, useRef } from "react";
import decryptUrl from "../../utils/decrypturl";

 const SEARCH_ENDPOINT = 'https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=';
 const SONG_DETAILS_ENDPOINT = 'https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids='
const Searchbar = () => {
  const dispatch = useDispatch();


  const input = useRef(null);

  const changehandler = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };


  const fetchSongDetails = async (songIds) => {
    try {
      const detailsUrl = `${SONG_DETAILS_ENDPOINT}${songIds}`;
      const response = await fetch(detailsUrl);
      const text = await response.text();
      
      const pattern = /\(From "([^"]+)"\)/g;
      const modifiedText = text.replace(pattern, (match, p1) => `(From '${p1}')`);
      const decodedText = modifiedText.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
      
      const jsonResponse = JSON.parse(decodedText);
      
      const songsArray = Object.values(jsonResponse);
      songsArray.forEach(song => {
        if (song.encrypted_media_url) {
          song.media_url = decryptUrl(song.encrypted_media_url);
        }
        if(song.singers){
          song.singer =song?.singers?.split(',')[0] 

        }
      });
      console.log(songsArray)
      return songsArray;
    } catch (err) {
        console.error('Error fetching song details:', err);
        return null;
    }
};

  const handleSearch = async () => {



      try {
        const searchUrl = `${SEARCH_ENDPOINT}${input.current.value}`;
        console.log(searchUrl);

        // Fetch and get response text
        const response = await fetch(searchUrl);
        const text = await response.text();
        
        const pattern = /\(From "([^"]+)"\)/g;
        const modifiedText = text.replace(pattern, (match, p1) => `(From '${p1}')`);
        const decodedText = modifiedText.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
        
        const jsonResponse = JSON.parse(decodedText);
        const songResponse = jsonResponse.songs.data;
        
        // Extract IDs from search results
        const songIds = songResponse.map(song => song.id).join(',');
        
        // Fetch details for all songs
        const songDetails = await fetchSongDetails(songIds);
        console.log('Song Details:', songDetails);
        
        // You can dispatch the song details to your Redux store here
        // dispatch(setSongDetails(songDetails));
        
        dispatch(addTracks(songDetails)) ;

    } catch (err) {
        console.error('Error fetching search results:', err);
        // Log the actual response text for debugging
        return null;
    }
  
  };

  useEffect(() => {
    input.current.value = "Best of Bollywood";
    handleSearch();

  }, []);

  return (
    <div className="w-full flex md:justify-start justify-center lg:pl-24 md:pl-6 mt-8">
      <input
        type="text"
        placeholder="Search for songs, albums, artists..."
        className="outline-none w-8/12 border-[0.5px] border-slate-300 h-9 rounded-md px-4 bg-[#212529] text-slate-100"
        onKeyDown={changehandler}
        ref={input}
      />
    </div>
  );
};

export default Searchbar;
