import React from 'react';
import { useSelector } from "react-redux";
import DiscoverCards from "./DiscoverCards";
import "../App.css"

const Discover = () => {
  const newAlbums = useSelector((store) => store.discover.albums);
  const newArtists = useSelector((store)=>store.discover.artists) ;
  const newTracks = useSelector((store)=>store.discover.tracks) ;
  const newPlayList = useSelector((store)=>store.discover.playlist)

  return (
    <div className="flex flex-col scrollbar-hide mt-8 w-[80%]  xl:pt-[58rem] lg:pt-[60.5rem] md:pt-[55rem] pt-[12rem] scroll-x-hidden">
      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2xl pb-4'>Trending Album </p>
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newAlbums.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.images[0].url}
            type={element.type[0].toUpperCase() + element.type.slice(1)}
            artist={element.artists[0].name} 
          />
        ))}
      </div>
      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2xl pb-4'>Buzzing Artists </p> 
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        { newArtists && newArtists.map((element) => (
          
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.images[0].url}
            genres={element.genres
             }
             type={"artist"}
            artist={null}
           
          />
        ))}
      </div>
      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2x pb-4'>Hot Picks </p>
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newTracks.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.album.images[0].url}
            type={"tracks"}
          
            artist={element.artists[0].name}
          />
        ))}
      </div>

      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2x pb-4' >Top Playlists </p>
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newPlayList.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.images[0].url}
          
           type={"playlist"}
          />
        ))}
      </div>
      

      

    
    </div>
  );
};

export default Discover;

import React from 'react';
import { useSelector } from "react-redux";
import DiscoverCards from "./DiscoverCards";
import "../App.css"

const Discover = () => {
  const newAlbums = useSelector((store) => store.discover.albums);
  const newArtists = useSelector((store)=>store.discover.artists) ;
  const newTracks = useSelector((store)=>store.discover.tracks) ;
  const newPlayList = useSelector((store)=>store.discover.playlist)

  return (
    <div className="flex flex-col scrollbar-hide mt-8 w-[80%]  xl:pt-[58rem] lg:pt-[60.5rem] md:pt-[55rem] pt-[12rem] scroll-x-hidden">
      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2xl pb-4'>Trending Album </p>
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newAlbums.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.images[0].url}
            type={element.type[0].toUpperCase() + element.type.slice(1)}
            artist={element.artists[0].name} 
          />
        ))}
      </div>
      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2xl pb-4'>Buzzing Artists </p> 
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        { newArtists && newArtists.map((element) => (
          
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.images[0].url}
            genres={element.genres
             }
             type={"artist"}
            artist={null}
           
          />
        ))}
      </div>
      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2x pb-4'>Hot Picks </p>
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newTracks.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.album.images[0].url}
            type={"tracks"}
          
            artist={element.artists[0].name}
          />
        ))}
      </div>

      <p className='text-slate-200 lg:text-4xl font-semibold md:text-3xl text-2x pb-4' >Top Playlists </p>
      <div className='flex lg:w-[80rem] md:[rem] w-[40rem] lg:space-x-6 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar'>
        {newPlayList.map((element) => (
          <DiscoverCards
            key={element.id}
            name={element.name}
            image={element.images[0].url}
          
           type={"playlist"}
          />
        ))}
      </div>
      

      

    
    </div>
  );
};

export default Discover;
