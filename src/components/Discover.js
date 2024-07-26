
import React from 'react';
import { useSelector } from "react-redux";
import DiscoverCards from "./DiscoverCards";
import "../App.css"

const Discover = () => {
  const newAlbums = useSelector((store) => store.discover.albums);
  const albums = Object.keys(newAlbums)
  const newArtist = useSelector((store)=>store.discover.artists) ;
  const artists = Object.keys(newArtist)
  const newTracks = useSelector((store)=>store.discover.tracks) ;
  const newPlayList = useSelector((store)=>store.discover.playlist)
  const playlists = Object.keys(newPlayList)

  return (
    <div className="flex flex-col scrollbar-hide mt-8 w-[80%]  xl:pt-[52rem] lg:pt-[52rem] md:pt-[44rem] pt-[18rem] scroll-x-hidden  h-lg:pt-[20rem] mobile:pt-[12rem] small-mobile:pt-[24rem]">
      <p className='text-slate-200 lg:text-3xl  md:text-2xl text-1xl pb-4'>Trending Album </p>
      <div className='flex lg:w-[70rem] md:[rem] w-[40rem] lg:space-x-2 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {albums.map((element , index) => (
          <DiscoverCards
            key={index} 
            name={element}
            image={newAlbums[element].image}
            type={"album"}
            artist={newAlbums[element].artist} 
          />
        ))}
      </div>
      <p className='text-slate-200 lg:text-3xl  md:text-2xl text-1xl pb-4'>Buzzing Artists </p> 
      <div className='flex lg:w-[70rem] md:[rem] w-[40rem] lg:space-x-2 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        { artists && artists.map((element ,index) => (
          
          <DiscoverCards
            key={index}
            name={element}
            image={newArtist[element].image}
            genres={newArtist[element].genres
             }
             type={"artist"}
            artist={null}
           
          />
        ))}
      </div>
      <p className='text-slate-200 lg:text-3xl  md:text-2xl text-1xl pb-4'>Hot Picks </p>
      <div className='flex lg:w-[70rem] md:[60rem] w-[40rem] lg:space-x-2 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newTracks.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.album.images[0].url}
            type={"tracks"}
          
            artist={element.artists[0].name}
            url = {element.preview_url}
          />
        ))}
      </div>

      <p className='text-slate-200 lg:text-3xl  md:text-2xl text-1xl pb-4' >Top Playlists </p>
      <div className='flex lg:w-[70rem] md:[rem] w-[40rem] lg:space-x-2 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {playlists.map((element , index) => (
          <DiscoverCards
            key={index}
            name={element}
            image={newPlayList[element].image}
          
           type={"playlist"}
          />
        ))}
      </div>
      

      

    
    </div>
  );
};

export default Discover;
