import React, { useState  , useEffect} from 'react';
import MatchCard from './MatchCard'
import { useSelector } from 'react-redux';

const Request = ({ selectedOption }) => {
  const reqs = useSelector((store)=>store.user.requests)
  const friends = useSelector((store)=>store.user.friends)
  const matchResults = useSelector((store)=>store.user.matchResults)

  useEffect(() => {
    setShowProfile(false);
  }, [selectedOption])
  

  const [showProfile, setShowProfile] = useState(false);


  const clickHandler = () => {
    setShowProfile(true);
  };
  

  const requests = [
    {
      dp: 'https://via.placeholder.com/150',
      name: 'John Doe',
      location: 'New York, USA',
    },
    {
      dp: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      location: 'Los Angeles, USA',
    },
  ];

  return (
    <div>
      {showProfile ? (
        <MatchCard />
      ) : (
        <div className="w-full max-w-md mx-auto p-4">
          {requests.map((request, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg mb-2 bg-gray-700"
            >
              <div className="flex items-center">
                <img
                  src={request.dp}
                  alt={request.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="text-white font-semibold">{request.name}</p>
                  <p className="text-gray-400 text-sm">{request.location}</p>
                </div>
              </div>
              <button
                className="text-indigo-500 hover:text-indigo-700 font-semibold text-sm"
                onClick={clickHandler}
              >
                {selectedOption === 'friends' ? 'View Profile' : 'View Request'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Request;
