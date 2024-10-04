import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { initiateQueue } from "../redux/playerSlice";


const useGetPlaying = () =>{
    const dispatch = useDispatch()


    const searchHindiSongs = async () => {

      try{
        const token = localStorage.getItem('token')
        const searchUrl = 'https://api.spotify.com/v1/search';
        const query = ' hindi songs'; 
      
        const response = await axios.get(searchUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            q: query,
            type: 'track',
            limit: 10, 
          },
        });
        const arr= [] 
      
         const data = response.data.tracks.items;
         data.forEach(element => {
            const obj ={
                name:element.name ,
                url:element.preview_url ,
                image:element.album.images[0].url ,
                singer:element.artists[0].name ,
                artist:element.artists.length>1 ? (element.artists[1].name):("Solo") ,
            }
            arr.push(obj)
            
         });
         dispatch(initiateQueue(arr))
      }catch(err){

      }
       
         
}
useEffect(()=>{
      searchHindiSongs()
} , [])
}


export default useGetPlaying