import axios from "axios";
import { SEARCH_ENDPOINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addAlbums , addTracks } from "../redux/resultsSlice";
import { useEffect, useRef } from "react";

const Searchbar = () => {
  const dispatch = useDispatch();
  const input = useRef(null) 

  const changehandler = (e)=>{
    if(e.keyCode===13){
      console.log(input.current.value)
      handleSearch()
    }  
    
      }

  const handleSearch = async () => {
    const access_token = localStorage.getItem("token");
    console.log(access_token)

    try {
      if (access_token) {
        const response = await axios.get(SEARCH_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: `${input.current.value}`,
            type: 'album,track', 
          },
        });

        console.log(response);
        const albumsWithTracks = await Promise.all(
          response.data.albums.items.map(async (album) => {
            const tracks = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
             
            })
            return { album, tracks: tracks.data.items };

      }))

      console.log(albumsWithTracks)

      dispatch(addTracks(response.data.tracks.items))
      dispatch(addAlbums ({albumsWithTracks}))

        
     

      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };


  useEffect(() => {
    input.current.value='Yash Mishra'
    handleSearch();
  }, []);

  return (
    <div className='w-full flex justify-start pl-24 mt-8'>
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