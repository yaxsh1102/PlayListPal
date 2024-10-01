import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenReady } from "../redux/discoverSlice"
const TOKEN_ENDPOINT = process.env.REACT_APP_TOKEN_ENDPOINT
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET



const useGetToken = ()=>{
  const dispatch = useDispatch()
    const getToken = async () => {
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
        setTimeout(() => {
          dispatch(setTokenReady(true));
        }, 4000)
        

  
      };
      useEffect(()=>{
        getToken()
      } , [])
}

export default useGetToken ;