import { useEffect } from "react";
import { TOKEN_ENDPOINT , SPOTIFY_CLIENT_ID , SPOTIFY_CLIENT_SECRET } from "../utils/constants";


const useGetToken = ()=>{
  console.log("hello")
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
        console.log(data)
        localStorage.setItem("token" ,data.access_token)

  
      };
      useEffect(()=>{
        getToken()
      } , [])
}

export default useGetToken ;