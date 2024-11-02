import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { useSelector } from "react-redux";

const Request = ({ selectedOption }) => {
  const reqs = useSelector((store) => store.user.requests);
  const friends = useSelector((store) => store.user.friends);
  

  useEffect(() => {
    setShowProfile(false);
  }, [selectedOption]);
 
  const [showProfile, setShowProfile] = useState(false);
  const [index, setIndex] = useState(0);

  const clickHandler = (index) => {
    setIndex(index);
    setShowProfile(true);
  };

  return (
    <div>
      {showProfile ? (
        <MatchCard
          selectedOption={selectedOption}
          index={index}
          setShowProfile={setShowProfile}
        />
      ) : (
        <div className="w-full max-w-md mx-auto p-4">
          <div>
            {selectedOption === "requests" ? (
              reqs && reqs.length > 0 ? (
                reqs.map((request, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg mb-2 bg-gray-700"
                  >
                    <div className="flex items-center">
                      <img
                        src={"" + request?.datingProfile.imageUrl + ""}
                        alt={request?.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-white font-semibold">
                          {request?.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {request?.datingProfile?.city +
                            " , " +
                            request?.datingProfile?.state}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-indigo-500 hover:text-indigo-700 font-semibold text-sm"
                      onClick={() => clickHandler(index)}
                    >
                      View Request
                    </button>
                  </div>
                ))
              ) : (
                <div className=" text-center text-indigo-500 p-4 ">
                  It's empty here..
                  
                </div>
              )
            ) : friends && friends.length > 0 ? (
              friends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg mb-2 bg-gray-700"
                >
                  <div className="flex items-center">
                    <img
                      src={"" + friend?.datingProfile?.imageUrl + ""}
                      alt={friend?.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-white font-semibold">{friend?.name}</p>
                      <p className="text-gray-400 text-sm">
                        {friend?.datingProfile?.city +
                          " , " +
                          friend?.datingProfile?.state}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-indigo-500 hover:text-indigo-700 font-semibold text-sm"
                    onClick={() => clickHandler(index)}
                  >
                    View Profile
                  </button>
                </div>
              ))
            ) : (
              <div className="text-indigo-500 text-center ">
                It's Empty Here.
             </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
