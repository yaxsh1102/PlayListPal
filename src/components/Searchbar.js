import axios from "axios";
import { SEARCH_ENDPOINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addResult } from "../redux/resultsSlice";
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
    // const access_token = "BQBX_snykL5-vXynka2C3LAeaWSgrIU51HrC-Q0BvPjBceebzHuzhT3q-6wdscyrQPyR3kIbf_zJ2aTvTw1swNKFAe-PPLADAzvv9B2simbCCY8lqf0"
    console.log(access_token)

    try {
      if (access_token) {
        const response = await axios.get(SEARCH_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: `${input.current.value}`,
            type: 'album,artist,track', 
          },
        });

        console.log(response);
        const obj = {
          album: response.data.albums,
          artists: response.data.artists,
          tracks: response.data.tracks,
        };
        console.log(obj);

        dispatch(addResult(obj));
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
