import React, { useState , useEffect} from 'react';
import MatchLanding from './MatchLanding'; 
import Request from './Requests'; 
import MatchCard from './MatchCard';
import { useDispatch  , useSelector} from 'react-redux';  
import { addNowPlaying } from '../../redux/playerSlice';
import { setReqandFriends } from '../../redux/userSlice';


const Match = () => {
  const dispatch = useDispatch() ;
  const {requests , friends} = useSelector((store)=>store.user)


    

  useEffect(()=>{

    async function getDetails(){

      try{
        const data = await fetch('http://localhost:4000/api/v1/match/getInfo' , {
          method:"POST" ,
          headers:{
            'content-type':'application/json' ,
            'Authorization':`Bearer ${localStorage.getItem('db_token')}`
          } ,
  
        })
          const resp = await data.json()
          dispatch(setReqandFriends({requests:resp.requests , friends:resp.friends}))
  
  
  
      }catch(err){

      }
     
    }

    !requests && !friends && getDetails()
    return()=>{
    }


  } ,[])


  const [selectedOption, setSelectedOption] = useState('landing');
  dispatch(addNowPlaying(null))

  

  const handleOptionClick = (option) => {

    setSelectedOption(option);
  };

  return (
    <div className='w-full h-screen overflow-hidden no-scrollbar bg-gradient-to-tr from-[#181818] to-[#121111] z-50'>
      <div className="h-[10%] flex md:justify-center justify-center items-center">
        <button
          onClick={() => handleOptionClick('landing')}
          className={`relative py-2 px-4 md:text-lg text-base font-normal ${selectedOption === 'landing' || selectedOption==='find-match' ? 'text-indigo-500' : 'text-gray-300'}`}
        >
          Find Match
          {(selectedOption === 'landing' || selectedOption==='find-match') && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-indigo-500"></div>
          )}
        </button>
        <button
          onClick={() => handleOptionClick('requests')}
          className={`relative py-2 px-4 md:text-lg text-base font-normal ${selectedOption === 'requests' ? 'text-indigo-500' : 'text-gray-300'}`}
        >
          Requests
          {selectedOption === 'requests' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-indigo-500"></div>
          )}
        </button>
        <button
          onClick={() => handleOptionClick('friends')}
          className={`relative py-2 px-4 md:text-lg text-base font-normal ${selectedOption === 'friends' ? 'text-indigo-500' : 'text-gray-300'}`}
        >
          Friends
          {selectedOption === 'friends' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-indigo-500"></div>
          )}
        </button>
      </div>

      <div className="h-[90%]">
        {selectedOption === 'landing' && (
          <MatchLanding setsetSelectedOption={setSelectedOption} />  
        )}

        {selectedOption === 'find-match' && (
          <MatchCard  selectedOption={selectedOption} /> 
        )}

        {(selectedOption === 'requests' || selectedOption === 'friends') && (
          <Request selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        )}
      </div>
    </div>
  );
};

export default Match;
