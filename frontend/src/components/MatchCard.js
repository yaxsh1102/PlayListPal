import React, { useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowBack } from 'react-icons/io';
import { FaInstagram, FaTelegramPlane, FaSnapchatGhost, FaLock } from 'react-icons/fa';
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { FiUserCheck } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { sendToast } from '../redux/toastSlice';





import { useSelector, useDispatch } from 'react-redux';
import { moveCurrentProfile, setReqandFriends } from '../redux/userSlice';

const MatchCard = ({ selectedOption, index }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentProfile, setCurrentProfile] = useState();
  const [showReadMore , setShowReadMore] = useState(false) ;
  const dispatch = useDispatch();

  const reqs = useSelector((store) => store.user.requests);
  const friends = useSelector((store) => store.user.friends);
  const matchResults = useSelector((store) => store.user.matchResults);
  console.log(selectedOption )

  useEffect(() => {
    if (selectedOption === 'requests') {
      setCurrentProfile(reqs[index]);
    } else if (selectedOption === 'friends') {
      setCurrentProfile(friends[index]);
    } else if (selectedOption === 'find-match') {
      setCurrentProfile(matchResults[0]);
    }
  }, [selectedOption, reqs, friends, matchResults, index]);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  async function sendRequest() {
    try {
      const data = await fetch('http://localhost:4000/api/v1/match/sendRequest', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('db_token')}`
        },
        body: JSON.stringify({ reqReceiverId: currentProfile._id })
      });
      const resp = await data.json()
      if(resp.success){
      dispatch(moveCurrentProfile('find-match'))
      dispatch(sendToast('Request Sent'))
      }else{
        dispatch(sendToast(resp.message))
        

      }

    } catch (err) {
      dispatch("Error Occured")

      console.log(err);
    }
  }

  async function acceptRequest() {
    try {
      const data = await fetch('http://localhost:4000/api/v1/match/acceptRequest', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('db_token')}`
        },
        body: JSON.stringify({ reqSenderId: currentProfile._id })
      });
      const resp = await data.json()
      
      if(resp.success){
      dispatch(moveCurrentProfile('requests'))
      dispatch(setReqandFriends({requests: null , friends:resp.friends}))
      dispatch(sendToast("Request Accepted"))

      }else{
        dispatch(sendToast(resp.message))

      }

    } catch (err) {
      dispatch(sendToast("Couldn't Accept Request"))

      console.log(err);
    }
  }

  async function rejectReqHandler() {
    try {
      const data = await fetch('http://localhost:4000/api/v1/match/rejectRequest', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('db_token')}`
        },
        body: JSON.stringify({ reqSenderId: currentProfile._id })
      });
      const resp = await data.json()

      if(resp.success){
      dispatch(moveCurrentProfile('requests'))

      dispatch(setReqandFriends({requests: resp.requests , friends:null}))
      dispatch(sendToast("Request Rejected"))
      }else{
        dispatch(sendToast(resp.message))

      }

    } catch (err) {
      dispatch(sendToast("Couldn't Reject"))
      console.log(err);
    }
  }

  async function removeFriend() {
    try {
      const data = await fetch('http://localhost:4000/api/v1/match/removeFriend', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('db_token')}`
        },
        body: JSON.stringify({ friendId: currentProfile._id })
      });

      const resp = await data.json() 
      if(resp.success){
      dispatch(moveCurrentProfile('friends'))
      dispatch(setReqandFriends({friends: resp.friends , requests:null}))
      dispatch(sendToast("Removed"))
      }else {
        dispatch(sendToast(resp.message))

      }

    } catch (err) {
      dispatch(sendToast("Couldn't Remove Friend"))
      console.log(err);
    }
  }

  return (
    <>
      {currentProfile ? (
        <div className="w-full h-screen text-white flex flex-col mt-8 items-center relative">
         

          <div
            className="w-full max-w-sm h-[70vh] bg-cover bg-center rounded-2xl shadow-lg relative"
            style={{
              backgroundImage: 'url(shivansh.jpg)', 
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent flex items-center space-y-2">
              <div className="flex justify-between items-center w-full px-4">
                <p className="text-lg font-semibold">{`${currentProfile?.name},  ${currentProfile?.age}`}</p>
              </div>

              <div className="flex justify-end items-center px-4">
                <button
                  className="text-white text-2xl cursor-pointer"
                  onClick={toggleOverlay}
                >
                  <IoIosArrowUp />
                </button>
              </div>
            </div>

            {showOverlay && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-10 overflow-auto no-scrollbar">
                <div className="text-left flex flex-col justify-start space-y-4 w-full max-w-md px-4 py-6 bg-opacity-100 rounded-lg">
                  <p className="text-xl mb-0 pt-10">Bio: </p>
                  <p className="text-sm mb-0 text-start w-full break-words">
                    {currentProfile?.datingProfile?.about ||currentProfile.about  }</p>

                  <div className="space-y-2">
                    <div className="flex">
                      <p className="text-md w-32">Gender:</p>
                      <p className="text-md ml-4">{currentProfile?.datingProfile?.gender || currentProfile?.gender}</p>
                    </div>
                    <div className="flex">
                      <p className="text-md w-32">Orientation:</p>
                      <p className="text-md ml-4">{currentProfile?.datingProfile?.sexualOrientation || currentProfile?.sexualOrientation}</p>
                    </div>
                    <div className="flex">
                      <p className="text-md w-32">Lives in:</p>
                      <p className="text-md ml-4">{`${currentProfile?.datingProfile?.city || currentProfile?.city }, ${currentProfile?.datingProfile?.state || currentProfile?.state}`}</p>
                    </div>
                  </div>

                  <div className="text-md mb-4">
                    <p className="mb-2">Socials:</p>
                    <div className="flex flex-col space-y-2 ml-2">
                      <div className={`flex items-center space-x-2 `}>
                        <p className='w-32'>
                        <FaInstagram />

                        </p>
                        <span>{selectedOption==='friends' ? (currentProfile?.datingProfile?.instagram) :(<FaLock></FaLock>) }</span>
                      </div>
                      <div className={`flex items-center space-x-2 `}>
                        <p className='w-32'>
                        <FaTelegramPlane />

                        </p>
                        <span className={`${selectedOption==='friends' ? (''):('ml-20')}`}>{selectedOption==='friends' ? (currentProfile?.datingProfile?.telegram) :(<FaLock></FaLock>) }</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className='w-32'>
                        <FaSnapchatGhost />
                        </p>
                        <span>{selectedOption==='friends' ? (currentProfile?.datingProfile?.snapchat) :(<FaLock></FaLock>) }</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200 transition-colors duration-200 self-center"
                    onClick={toggleOverlay}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {selectedOption === 'find-match' && (
            <div className="md:w-[384px] w-full flex justify-evenly mt-4 px-4">
              <button
                className=""
                onClick={() => { dispatch(moveCurrentProfile("find-match")) }}
              >
                <RxCross2 size={28}></RxCross2>
              </button>
              <button
                className=""
                onClick={sendRequest}
              >
                <SlUserFollow size={28}></SlUserFollow>
              </button>
            </div>
          )}

          {selectedOption === 'requests' && (
            <div className="md:w-[384px] w-full flex justify-evenly mt-4 px-4">
              
              <button
                className=" text-white text-xl  rounded-sm"
                onClick={rejectReqHandler}
              >
                <RxCross2 size={28}></RxCross2>
              </button>
              <button
                className=" text-white text-xl rounded-sm"
                onClick={acceptRequest}
              >
                <FiUserCheck size={28}></FiUserCheck>
              </button>
            </div>
          )}

          {selectedOption === 'friends' && (
            <div className="md:w-[384px] w-full flex justify-evenly mt-4 px-4">
               {/* <button
            className=" text-white text-3xl cursor-pointer z-10"
            onClick={() => dispatch(moveCurrentProfile(null))}
          >
            <IoIosArrowBack />
          </button> */}
              <button
                className=""
                onClick={removeFriend}
              >
                <SlUserUnfollow size={28}></SlUserUnfollow>
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <p className='text-indigo-600'>It's Empty Here</p>
        </div>
      )}
    </>
  );
};

export default MatchCard;
