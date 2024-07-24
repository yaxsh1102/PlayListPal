import { useSelector } from "react-redux"

const useGetUserPlaylist =()=>{
    const availablePlaylists = useSelector((state)=>state.playlist.playlist)
    return availablePlaylists;
}

export default useGetUserPlaylist;