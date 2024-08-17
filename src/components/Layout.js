import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useState } from "react";
import MusicPlayer from "./MusicPlayer";
import { useSelector } from "react-redux";


const Layout =()=>{
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const nowPlaying = useSelector((store)=>store.player.nowPlaying)
  
  const toggleSearchBarVisibility = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

    return (
      <>
        <div className="flex">
          <div className="">
            <Sidebar toggleSearchBarVisibility={toggleSearchBarVisibility}/>
            { nowPlaying && <MusicPlayer nowPlaying={nowPlaying}></MusicPlayer>}
          </div>
          <div className="xxl:ml-60 md:ml-0 w-full">
            <Outlet/>
          </div>
        </div>
    </>
    )
}

export default Layout;