import React, { useState } from 'react';
import MatchLanding from './MatchLanding'; // Import MatchLanding component
import Request from './Requests'; // Import Request component

const Match = () => {
  const [selectedOption, setSelectedOption] = useState('find-match');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='w-full h-screen bg-black'>
      <div className="h-[10%] flex md:justify-center justify-center items-center">
        <button
          onClick={() => handleOptionClick('find-match')}
          className={`relative py-2 px-4 md:text-lg text-base font-normal ${selectedOption === 'find-match' ? 'text-indigo-500' : 'text-gray-300'}`}
        >
          Find Match
          {selectedOption === 'find-match' && (
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
        {selectedOption === 'find-match' && (
          <MatchLanding /> 
        )}

        {(selectedOption === 'requests' || selectedOption === 'friends') && (
          <Request />
        )}
      </div>
    </div>
  );
};

export default Match;
