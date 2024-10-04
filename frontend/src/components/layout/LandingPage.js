import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#000000] to-[#434343] overflow-y-auto text-white">
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 py-12 px-4">
        <div className="text-center">
          <img src='logo.png' className='sm:h-64 sm:w-64 h-48 w-48 mx-auto' alt="logo" />
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mt-6'>Stream • Connect</h1>
          <p className='text-xl md:text-2xl mt-2 text-indigo-300'>Where Music Streams and Souls Connect</p>
        </div>
        
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl sm:flex hidden">
            Discover a world where your music taste becomes your social network. Stream your favorite tunes, find kindred spirits, and create harmonious connections with fellow music enthusiasts.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-8">
          <button className="px-8 py-3 text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition duration-300 ease-in-out shadow-lg hover:shadow-xl" onClick={()=>{navigate("/login")}}> 
            Login
          </button>
          <button className="px-8 py-3 text-lg font-semibold text-indigo-300 border-2 border-indigo-300 hover:bg-indigo-500 hover:text-white rounded-md transition duration-300 ease-in-out shadow-lg hover:shadow-xl" onClick={()=>{navigate("/signup")}}>
            Signup
          </button>
        </div>
        
        
      </div>
    </div>
  )
}

export default LandingPage