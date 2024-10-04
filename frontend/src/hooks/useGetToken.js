import { useEffect } from "react";
// import {TOKEN_ENDPOINT , SPOTIFY_CLIENT_ID , SPOTIFY_CLIENT_SECRET} from '../utils/constants'
const TOKEN_ENDPOINT = process.env.REACT_APP_TOKEN_ENDPOINT
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET



const useGetToken = ()=>{
 

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
        localStorage.setItem("token" ,data.access_token)
    
      }catch(err){

      }
        
       
  
      };
      useEffect(()=>{
        getToken()
      } , [])
}

export default useGetToken ;
