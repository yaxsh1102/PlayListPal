import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Home = () => {
  const fullText = "Because kundli nahi , Vibes match honi chahiye !";
  const [displayText, setDisplayText] = useState('');
  
  // Typing effect configuration
  const typingEffect = useSpring({
    opacity: displayText.length > 0 ? 1 : 0,
    config: { duration: 150 }, // Adjust typing speed
  });

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index += 1;
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 80); // Adjust typing speed (80ms per character)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start pt-10 h-screen bg-gradient-to-tr from-dark-gray to-dark-pink text-white">
      <h1 className="text-9xl font-bold text-center mb-10 font-dancing-script">
        <animated.span style={typingEffect}>
          {displayText}
        </animated.span>
      </h1>
      
      <div className="w-10/12 flex justify-center mb-8">
        <button className="w-full px-6 py-3 bg-dark-pink text-white rounded-full hover:bg-pink-600 text-xl font-extrabold">
          Find matches
        </button>
      </div>

      {/* Dashed Line Separator */}
      <div className="w-10/12 my-8">
        <hr className="border-t-2 border-dashed border-gray-300" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-center mb-10 font-dancing" >Create the vibe ! </h1>
      </div>
      
      <div className="w-full flex p-5">
        <div className="w-full">
          <input
            type="text"
            className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-dark-gray"
            placeholder="Artists, songs, or podcasts"
          />
        </div>
        <div className="px-4 w-5/12 flex space-x-4">
          <button className="flex-1 w-full px-6 py-3 bg-dark-gray text-white rounded-full hover:bg-black">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
