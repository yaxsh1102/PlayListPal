import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Searchitems from './SearchItems';
import "../App.css"
import { useParams,useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Spinner from './Spinner';
import CreatePlaylistPopup from './CreatePlaylistPopup';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayPlaylist = ({type}) => {
  const { param } = useParams();
  const name = decodeURIComponent(param)
  const userplaylists = useSelector((store)=>store.playlist.playlist)
  const likedsongs = useSelector((store) => store.playlist.likedSongs || [])
  const albums = useSelector((store)=>store.discover.albums)
  const artists = useSelector((store)=>store.discover.artists)
  const playlists = useSelector((store)=>store.discover.playlists)
  const history = useSelector((store)=>store.player.history)
  const resAlbums = useSelector((store)=>store.result.albums)
  const isLoading = useSelector((store) => store.discover.isLoading);
  const currentPlaylist =  getCurrentPlaylist(type,name) || 'NOTFOUND';
  const heading = type==='likedsong' ? "Liked songs" : type==='history' ? 'History' : name;
  const subHeading =type==='likedsong' ? "No liked songs yet." : type==='history' ? 'Songs played in past will be displayed here' : "This playlist is empty ! " 
  const [isDeleting,setIsDeleting]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  const location = useLocation();
  const isUserPlaylist = location.pathname.split('/')[1]==='userplaylists';
  console.log(currentPlaylist)
 
  function getCurrentPlaylist(type,name){
    try{
    switch(type){
      case 'userplaylist' : return userplaylists[name];
      case 'likedsong' : return likedsongs 
      case 'album' : return albums[name].songs
      case 'artist' : return artists[name].songs
      case 'playlist' : return playlists[name].songs
      case 'result':return resAlbums[name].songs
      case 'history' : return history
      default : return null
    }
  }catch(err){
    return null
  }
  }

  const [showPopup, setShowPopup] = useState(false);

  const handleEdit = () => {
    setIsEditing(true)
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsEditing(false)
    setIsDeleting(false)
  };

  const handleDelete =()=>{
    setIsDeleting(true)
    setShowPopup(true)
  }

  return (
    <div className="w-full flex flex-col h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343]">
      { !currentPlaylist ? <Spinner/> : currentPlaylist==='NOTFOUND' ? <ErrorPage/> :
      <div className='w-full flex flex-col justify-center items-start md:pl-24 '>
        <div className='flex w-full border-b-[3px] border-black sticky'>
          <h1 className="w-full md:text-[2rem] text-[1.5rem] md:text-left text-center text-white mb-2 
        mt-10  ">
          {heading}
          </h1>
          {isUserPlaylist && (<div className='w-full flex space-around justify-end items-center pr-16 text-white gap-8 pt-10'>
            <button className='h-5' onClick={handleEdit}> <FontAwesomeIcon icon={faEdit} /> Edit</button>
            <button className='h-5' onClick={handleDelete}> <FontAwesomeIcon icon={faTrash} /> Delete</button>
          </div>)}
        </div>
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
                type={null}
                url={song.url}
              />
            ))
          )}

          {showPopup && (
                      <CreatePlaylistPopup
                        onClose={handleClosePopup}
                        edit = {isEditing}
                        old = {name}
                        del={isDeleting}
            />
          )}
        </div>
      </div>
}
    </div>
  );
};

export default DisplayPlaylist;