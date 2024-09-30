import { useEffect } from "react"
import { useDispatch  , useSelector} from "react-redux"
import { setPlaylist , setLikedSongs } from "../redux/playlistSlice"
import { setHistory } from "../redux/playerSlice"
import { setUser, toggleLoggedin } from "../redux/userSlice"

const useGetUser = ()=>{
  const isLoggedIn = useSelector((store)=>store.user.isLoggedIn)
  const dispatch = useDispatch()

    async function getUser(){
        try{
            if(!localStorage.getItem('db_token')){
                return 
            }
            const data = await fetch("https://playlistpal.onrender.com/api/v1/auth/getUserDetails" , {
                method:"get" ,
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${localStorage.getItem('db_token')}`
                  },
                
            })
    
            const response = await data.json() ;
            dispatch(setUser({name:response.data.name , email:response.data.email , ...response.data.datingProfile}))

            const playlists = response.data.playLists.reduce((acc, playlist) => {
                acc[playlist.name.toUpperCase()] = playlist.songs.map(song => ({
                    ...song, 
                    url: song.preview_url
                }));
                return acc; 
            }, {}); 
            console.log(response)
            dispatch(setPlaylist(playlists));
            const likedSongs = response.data.likedSongs.map((song) => ({
                ...song,
                url: song.preview_url,
                preview_url: undefined,  
            }));
    
            dispatch(setLikedSongs(likedSongs)) 
            dispatch(setHistory(response.data.history))
            dispatch(toggleLoggedin(true))
    
        }
        catch(err){


        }

       

}

useEffect(()=>{
    getUser()
// eslint-disable-next-line
},[isLoggedIn])

}

export default useGetUser 