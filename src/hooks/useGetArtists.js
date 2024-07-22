 import { useEffect } from "react";
 import axios from "axios";
 import { useDispatch } from "react-redux";
import { addNewArtists } from "../redux/discoverSlice";
const useGetArtists = ()=>{
    const dispatch = useDispatch()
    useEffect(() => {
        const getNewReleases = async () => {
          const access_token=localStorage.getItem("token")
    
          try {
            const response = await axios.get('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            });
            dispatch(addNewArtists(response.data.artists))
            

        
          } catch (err) {
            console.error("Error fetching new releases:", err.response ? err.response.data : err.message);
          }
        };
    
        getNewReleases();
      }, []);
    
    };

    export default useGetArtists
