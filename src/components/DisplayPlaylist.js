import React from 'react';
import { useSelector } from 'react-redux';
import Searchitems from './SearchItems';
import "../App.css"
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';


const DisplayPlaylist = ({type}) => {
  const { param } = useParams();
  const name = decodeURIComponent(param)
  console.log(name)
  const userplaylists = useSelector((store)=>store.playlist.playlist)
  const likedsongs = useSelector((store) => store.playlist.likedSongs || [])
  const albums = useSelector((store)=>store.discover.albums)
  const artists = useSelector((store)=>store.discover.artists)
  const playlists = useSelector((store)=>store.discover.playlists)
  console.log("albumssssssssssssss")
  console.log(albums)
  const currentPlaylist = getCurrentPlaylist(type,name);
  console.log(currentPlaylist)
  const heading = type=='likedsong' ? "Liked songs" : name
  const subHeading =type=='likedsong' ? "No liked songs yet." :"This playlist is empty ! " 

  function getCurrentPlaylist(type,name){
    switch(type){
      case 'userplaylist' : return userplaylists[name];
      case 'likedsong' : return likedsongs
      case 'album' : return albums[name].songs
      case 'artist' : return artists[name].songs
      case 'playlist' : return playlists[name].songs
    }
  }

  return (
    <div className="w-full flex flex-col h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343]">
      {!currentPlaylist ? <ErrorPage className="absolute w-[100vw] h-[100vh] z-50" /> :
      <div className='w-full flex flex-col justify-center items-start md:pl-24 '>
        <h1 className="w-full md:text-[3rem] text-[2rem] md:text-left text-center text-white font-bold mb-2 
        mt-10 border-b-[3px] border-black sticky ">
          {heading}
        </h1>
        <div className="w-full pb-[5rem] md:w-[80%] overflow-y-auto no-scrollbar " style={{ maxHeight: 'calc(100vh - 14rem)' }}>
          {currentPlaylist.length === 0 ? (
            <p className="mt-20 md:mt-[12rem] text-center md:text-left text-[1.5rem] md:text-[3rem] text-gray-300">
            {subHeading}
          </p>
          ) : (
            currentPlaylist.map((song, index) => (
              <Searchitems
                key={index}
                image={song.image}
                name={song.name}
                artist={song.artist}
                duration={song.duration}
                singer={song.singer}
                type={song.type}
                url={song.url}
              />
            ))
          )}
        </div>
      </div>
}
    </div>
  );
};

export default DisplayPlaylist;
