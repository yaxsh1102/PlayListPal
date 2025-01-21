import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function awakeServer() {
      setLoading(true);
      try {
        await fetch('https://playlistpal.onrender.com/awake-server', {
          method: "GET",
          headers: {
            'content-type': 'application/json'
          }
        });
      } catch(err) {
        
      } finally {
        setLoading(false);
      }
    }
    awakeServer();
  }, []);

  useEffect(()=>{
    async function awakeServer() {
      const jiosaavnResponse = await axios.get(`https://jiosaavnapi-0w6h.onrender.com/result/?query=server-awake`);
    }
    awakeServer();
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-[#000000] to-[#434343] overflow-y-auto text-white">
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-4 bg-black/40 p-6 rounded-lg">
          <LoadingButton/>
            <p className="text-white text-lg">
              Warming up the server...
            </p>
            <p className="text-white text-sm">
              This may take up to a minute
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 py-12 px-4">
        <div className="text-center">
          <img src='logo.png' className='sm:h-64 sm:w-64 h-48 w-48 mx-auto' alt="logo" />
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mt-6'>Stream • Connect</h1>
          <p className='text-xl md:text-2xl mt-2 text-indigo-300'>Where Music Streams and Souls Connect</p>
        </div>
        
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl sm:flex hidden">
            Discover a world where your music taste becomes your social network. Stream your favorite tunes, find kindred spirits, and create harmonious connections.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-8">
          <button 
            className="px-8 py-3 text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-sm transition duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Login
          </button>
          <button 
            className="px-8 py-3 text-lg font-semibold text-indigo-300 border-2 border-indigo-300 hover:bg-indigo-500 hover:text-white rounded-sm transition duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigate("/signup")}
            disabled={loading}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;