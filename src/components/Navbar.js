import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleSearch } from '../redux/toggleSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  function clickHandler (){ 
     dispatch(toggleSearch())

  }
  return (
    <div className="h-[8.5rem] w-full flex md:flex-row md:justify-between  items-center bg-transparent pl-[20%] md:px-12 ">
      <p className=" lg:text-3xl md:text-2xl  md:flex hidden text-slate-300">
        Playing for <span className="font-bold">&nbsp;Mann👋🏻</span>
      </p>
      <div className="flex lg:justify-center lg:gap-x-4 md:justify-between justify-center items-center  md:w-5/12 lg:w-4/12 w-8/12 md:ml-0 ml-8 lg:mr-[10rem]">
        <p onClick={clickHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f4ecec" viewBox="0 0 256 256" className="lg:w-9 lg:h-9 md:w-6 md:h-6 w-6 h-6">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </p>
        <button className="lg:w-[14rem]  lg:h-[3rem]   md:w-[8rem] md:h-[2rem] w-[10rem] h-[2rem]   bg-gradient-to-tr from-[#833ab4] via-[#681dfd] to-[#fcb045] text-sm md:text-lg font-bold mx-2 rounded text-white">
          Find Match!
        </button>
        <img src='logo512.png' alt='logo' className='lg:w-[3rem] lg:h-[3rem] md:w-[2rem] md:h-[2rem]  w-6 h-6' />
      </div>
    </div>
  )
}

export default Navbar;
