import React, { useEffect } from 'react';

const Popup = ({ message, visible }) => {
  return (
    <div
      className={`fixed top-4 right-4  bg-gradient-to-bl from-[#000000cf] to-[#282626a9]
         text-white p-4 rounded-lg shadow-md z-50 text-1xl transition-opacity duration-30000 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );
};

export default Popup;
