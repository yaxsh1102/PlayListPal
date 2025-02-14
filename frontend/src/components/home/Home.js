import React, { useEffect } from 'react';
import Navbar from './Navbar'; 
import Discover from './Discover';
import { useSelector  , useDispatch} from 'react-redux';
import SearchResults from '../search/SearchResults';
import Searchbar from '../search/Searchbar';
import { setCoordinates } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import useGetTracks from '../../hooks/useGetTracks';
import useNewRelease from '../../hooks/useNewRelease';
import useGetArtists from '../../hooks/useGetArtists';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import useGetPlaying from '../../hooks/useGetPlaying';
import useGetUser from '../../hooks/useGetUser';



const Home = () => {
  const {lat , lon } = useSelector((store)=>store.user) ;
  const navigate = useNavigate()
  if(!localStorage.getItem('db_token')){
    navigate("/login")
}



useGetPlaylist()
useGetPlaying()
useGetTracks()
useGetArtists()
useNewRelease()
useGetUser()

  async function sendLocation(){

    if(!lat || !lon){
      return 
    }

    try{
    const data = await fetch('https://playlist-pal.duckdns.org/backend/api/v1/auth/addLocation' ,{
      method:"POST" ,
      headers:
      {
        'content-type':'application/json' ,
        'AUthorization':`Beared ${localStorage.getItem('db_token')}`
      },
      body:JSON.stringify({lat , lon})
    })
  }catch(err){
  }
  }
    const searchToggle = useSelector((store)=>store.toggle.searchToggle) ;
    const dispatch = useDispatch();
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
           
          },
          (error) => {
             }
        );
      } else {

       
      }
    };
    useEffect(()=>{


    !lat && !lon && sendLocation()

    },[])
    getLocation() 


    return ( 
      <>
        <div className='flex flex-col w-full items-center bg-gradient-to-tr from-[#000000] to-[#434343] fixed h-full  '>
            {!searchToggle ? 
            ( <><Navbar />
            <div className={`pb-[8rem] ${searchToggle ? (`pt-[12rem] `):('')}  w-[100%] flex justify-center items-center h-[90vh] overflow-x-hidden `}>
                <Discover></Discover>
            </div></>) 
         : 
         (<><Searchbar/><SearchResults></SearchResults> </>)}
        </div>
      </>

    );
}

export default Home