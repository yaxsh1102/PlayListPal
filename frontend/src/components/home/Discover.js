import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import DiscoverCards from "./DiscoverCards";
import "../../App.css"
import Loader from '../layout/Loader';

const Discover = () => {
  const newAlbums = useSelector((store) => store.discover.albums);
  const albums = Object.keys(newAlbums);
  const newArtist = useSelector((store) => store.discover.artists);
  const artists = Object.keys(newArtist);
  const newTracks = useSelector((store) => store.discover.tracks);
  const newPlayList = useSelector((store) => store.discover.playlists);
  const playlists = Object.keys(newPlayList);

  const [paddingTop, setPaddingTop] = useState('16rem');

  useEffect(() => {
    const updatePadding = () => {
      const currentHeight = window.innerHeight;
      const currentWidth = window.innerWidth;
      
      if (currentWidth < 768) {
        const basePadding = 34; 
        const heightDifference = Math.max(currentHeight - 600, 0);
        const paddingReduction = Math.min(heightDifference / 70, 7) * 6.5;
        const newPadding = Math.max(basePadding - paddingReduction, 12);
        
        setPaddingTop(`${newPadding.toFixed(1)}rem`);
      } else {
        setPaddingTop('25rem');
      }
      
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  if (newTracks.length === 0 || albums.length === 0 || artists.length === 0 || playlists.length === 0) {
    return (
      <div className='w-full md:pr-[16rem]'>
        <Loader></Loader>
      </div>
    );
  }
 

  return (
    <div className="flex flex-col scrollbar-hide mb-8 w-[80%] " style={{ paddingTop }}>
      <div className='overflow-y-scroll md:pt-[26rem] overflow-x-hidden'>
      <p className='text-slate-200 lg:text-3xl  md:text-2xl text-1xl pb-4'>Trending Album </p>
      <div className='flex lg:w-[70rem] md:[rem] w-[40rem] lg:space-x-2 md:space-x-4 space-x-1   overflow-x-auto  no-scrollbar '>
        {albums.map((element , index) => (
          <DiscoverCards
            key={index} 
            name={element}
            image={newAlbums[element].image}
            type={"albums"}
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
             type={"artists"}
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
           type={"playlists"}
          />
        ))}
      </div>
    </div>

    </div>
    
    
  );
};

export default Discover;