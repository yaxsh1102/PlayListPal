import axios from "axios";
import { SEARCH_ENDPOINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addResult } from "../redux/resultsSlice";
import { useEffect } from "react";

const Searchbar = () => {
  const dispatch = useDispatch();

  const handleSearch = async () => {
    // const access_token = localStorage.getItem("token");
    const access_token = "BQBX_snykL5-vXynka2C3LAeaWSgrIU51HrC-Q0BvPjBceebzHuzhT3q-6wdscyrQPyR3kIbf_zJ2aTvTw1swNKFAe-PPLADAzvv9B2simbCCY8lqf0"
    console.log(access_token)

    try {
      if (access_token) {
        const response = await axios.get(SEARCH_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: "Baller",
            type: 'album,artist,track', // Specify all types
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
      // You can handle the error further here, like showing a notification to the user
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className='w-[100%] flex justify-center mt-8'>
      <input
        type="text"
        placeholder="Search for songs, albums, artists..."
        className="outline-none w-8/12 border-[0.5px] border-slate-300 h-9 rounded-md px-4 bg-[#212529] text-slate-100"
      />
    </div>
  );
};

export default Searchbar;
