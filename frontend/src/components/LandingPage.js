import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Discover from './Discover';
import { useSelector  , dispatch, useDispatch} from 'react-redux';
import SearchResults from './SearchResults';
import Searchbar from './Searchbar';
import { setCoordinates } from '../redux/userSlice';
import { sendToast } from '../redux/toastSlice';

const LandingPage = () => {
  const {lat , lon } = useSelector((store)=>store.user) ;






  async function sendLocation(){


    if(!lat || !lon){
      return 
    }
   

    try{
    const data = await fetch('http://localhost:4000/api/v1/auth/addLocation' ,{
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
            dispatch(sendToast("Location Access Needed"))
           
           
          }
        );
      } else {
        dispatch(sendToast("Location Access Needed"))

       
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

export default LandingPage