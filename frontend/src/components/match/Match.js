import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlaying } from '../../redux/playerSlice';
import { setReqandFriends, setCoordinates } from '../../redux/userSlice';
import { sendToast } from '../../redux/toastSlice';
import MatchLanding from './MatchLanding';
import Request from './Requests';
import MatchCard from './MatchCard';

const Match = () => {
  const dispatch = useDispatch();
  const { lat, lon, requests, friends } = useSelector((store) => store.user);
  const [selectedOption, setSelectedOption] = useState('landing');

  useEffect(() => {
    async function getDetails() {
      try {
        const data = await fetch('https://playlist-pal.duckdns.org/backend/api/v1/match/getInfo', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('db_token')}`
          },
        });
        const resp = await data.json();
        dispatch(setReqandFriends({ requests: resp.requests, friends: resp.friends }));
      } catch (err) {
        console.error("Error fetching match info:", err);
      }
    }

    if (!requests && !friends) {
      getDetails();
    }
  }, [requests, friends, dispatch]);

  useEffect(() => {
    let isLocationErrorDispatched = false;

    const getAndSendLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            dispatch(setCoordinates({ latitude, longitude }));
            
            try {
              await fetch('https://playlist-pal.duckdns.org/backend/api/v1/auth/addLocation', {
                method: "POST",
                headers: {
                  'content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('db_token')}`
                },
                body: JSON.stringify({ lat: latitude, lon: longitude })
              });
            } catch (err) {
              console.error("Error sending location to server:", err);
            }
          },
          (error) => {
            if (!isLocationErrorDispatched) {
              dispatch(sendToast("Location Access Needed"));
              isLocationErrorDispatched = true;
            }
          }
        );
      } else if (!isLocationErrorDispatched) {
        dispatch(sendToast("Geolocation is not supported by this browser."));
        isLocationErrorDispatched = true;
      }
    };

    if (!lat && !lon) {
      getAndSendLocation();
    }
  }, [lat, lon, dispatch]);

  dispatch(addNowPlaying(null));

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='w-full h-screen overflow-hidden no-scrollbar bg-gradient-to-tr from-[#181818] to-[#121111] z-50 pt-1'>
      <div className="h-[10%] flex md:justify-center justify-center items-center mt-1">
        <button
          onClick={() => handleOptionClick('landing')}
          className={`relative py-2 px-4 md:text-lg text-base font-normal ${selectedOption === 'landing' || selectedOption==='find-match' ? 'text-indigo-500' : 'text-gray-300'}`}
        >
          Match
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
          <MatchCard  selectedOption={selectedOption} setsetSelectedOption={setSelectedOption} /> 
        )}

        {(selectedOption === 'requests' || selectedOption === 'friends') && (
          <Request selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        )}
      </div>
    </div>
  );
};

export default Match;
