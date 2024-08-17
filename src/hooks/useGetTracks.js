import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewTracks } from "../redux/discoverSlice";
const useGetTracks = ()=>{
   const dispatch = useDispatch()
   useEffect(() => {
       const getNewReleases = async () => {
        const access_token=localStorage.getItem("token")

        const randomOffset = Math.floor(Math.random() * 1000)
   
         try {
           const response = await axios.get(`https://api.spotify.com/v1/search?q=year:2024&type=track&limit=10&offset=${randomOffset}`, {
             headers: {
               Authorization: `Bearer ${access_token}`,
             },
            
           });
           dispatch(addNewTracks(response.data.tracks.items))
       
         } catch (err) {
           console.error("Error fetching new releases:", err.response ? err.response.data : err.message);
         }
       };
   
       getNewReleases();
        // eslint-disable-next-line
     }, []);
   
   };

   export default useGetTracks 