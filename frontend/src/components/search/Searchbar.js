import axios from "axios";
// import { SEARCH_ENDPOINT } from "../../utils/constants";
import { useDispatch , useSelector } from "react-redux";
import { addAlbums , addTracks } from "../../redux/resultsSlice";
import { useEffect, useRef } from "react";
import { setLoading } from "../../redux/discoverSlice";

const SEARCH_ENDPOINT = process.env.REACT_APP_SEARCH_ENDPOINT 

const Searchbar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store)=>store.toggle.loading) 

  const input = useRef(null) 

  const changehandler = (e)=>{
    if(e.keyCode===13){
      handleSearch()
    }  
    
      }

  const handleSearch = async () => {
       dispatch(setLoading(true))


    const access_token = localStorage.getItem("token");

    try {
      if (access_token) {
        const response = await axios.get(SEARCH_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: `${input.current.value}`,
            type: 'album,track', 
            limit:6
          },
        });

        const albumsWithTracks = await Promise.all(
          response.data.albums.items.map(async (album) => {
            try{
              const tracks = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
               
              })
              return { album, tracks: tracks.data.items };
            }catch(err){

            }
           

      }))

      dispatch(addTracks(response.data.tracks.items))
      dispatch(addAlbums ({albumsWithTracks}))
      dispatch(setLoading(false))

        
     

      }
    } catch (error) {
    }
  };


  useEffect(() => {

    input.current.value='Yash Mishra'
    handleSearch();
  }, []);

 
  return (
    <div className='w-full flex md:justify-start justify-center lg:pl-24 md:pl-6 mt-8'>
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