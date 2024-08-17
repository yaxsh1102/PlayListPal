import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setPlaylist , setLikedSongs } from "../redux/playlistSlice"

const useGetUser = ()=>{
  const isLoggedIn = useSelector((store)=>store.user.isLoggedIn)
  const dispatch = useDispatch()

    
    async function getUser(){

        if(!localStorage.getItem('db_token')){
            return 
        }
        const data = await fetch("http://localhost:4000/api/v1/auth/getUserDetails" , {
            method:"get" ,
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('db_token')}`
              },
            
        })

        const response = await data.json() ;
        console.log(response)
        const playlists = response.data.playLists.reduce((acc, playlist) => {
            acc[playlist.name.toUpperCase()] = playlist.songs.map(song => ({
                ...song,
                url: song.preview_url
            }));
            return acc;
        }, {}); 
        dispatch(setPlaylist(playlists));
        const likedSongs = response.data.likedSongs.map((song) => ({
            ...song,
            url: song.preview_url,
            preview_url: undefined,  
        }));

        dispatch(setLikedSongs(likedSongs))

    }

    useEffect(()=>{
         getUser()
     // eslint-disable-next-line
    },[isLoggedIn])

}

export default useGetUser