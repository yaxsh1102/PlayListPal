import React from 'react'

const MatchLanding = ({setsetSelectedOption}) => {
  return (
         <div className="flex flex-col items-center justify-center h-[90%] p-6 text-white">
        <h1 className="lg:text-4xl md:text-2xl text-center font-light tracking-wide mb-8">
          Uniting Hearts, Discover Connections Through Shared <span className='text-indigo-500'>Musical Harmonies</span>
        </h1>
        <p className="lg:text-2xl md:text-xl text-center mb-6">
          Pick Your Favorites to Find Your Perfect Match
        </p>
        <div className="w-full max-w-xs">
          {/* Distance Radius Input */}
         

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8 appearance-none bg-gray-800 border-2 border-gray-400 checked:bg-gray-800 checked:border-gray-700 checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:left-2 checked:after:top-1/2 checked:after:-translate-y-1/2 focus:ring-0 relative"
              />
              <span className="ml-4 text-lg">Playlist</span>
            </label>
          </div>
          <div className="mb-8">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8 appearance-none bg-gray-800 border-2 border-gray-400 rounded-sm checked:bg-gray-800 checked:border-gray-700 checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:left-2 checked:after:top-1/2 checked:after:-translate-y-1/2 focus:ring-0 relative"
              />
              <span className="ml-4 text-lg">Liked Songs</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 " htmlFor="distance-radius">
              Add Distance Radius (in kms)
            </label>
            <input
              type="text"
              id="distance-radius"
              
              className="w-full px-3 py-2  rounded bg-gray-800 outline-none text-slate-400"
              placeholder="Enter radius"
            />
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{setsetSelectedOption('find-match')}}>
            Find My Match
          </button>
        </div>
      </div>
  )
}

export default MatchLanding