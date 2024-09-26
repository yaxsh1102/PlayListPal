import { useEffect } from "react";
import { TOKEN_ENDPOINT , SPOTIFY_CLIENT_ID , SPOTIFY_CLIENT_SECRET } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setTokenReady } from "../redux/discoverSlice";


const useGetToken = ()=>{
  const dispatch = useDispatch()

    const getToken = async () => {

      try{

        const response = await fetch(TOKEN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
          },
          body: 'grant_type=client_credentials',
        });
        const data = await response.json();
        if(data.access_token){
        localStorage.setItem("token" ,data.access_token)
        dispatch(setTokenReady(true))
        } else {
          dispatch(setTokenReady(false))
        }
      }catch(err){
        

        
      }
        


  
      };
      useEffect(()=>{
        getToken()
      } , [])
}

export default useGetToken ;