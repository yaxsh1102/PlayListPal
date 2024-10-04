import React from 'react'
import { useDispatch } from 'react-redux';

const Loader = () => {
  const dispatch = useDispatch()
  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className="loader lg:w-[10rem] w-[6rem]   aspect-[1/1]"  ></div>
    <p className='text-4xl text-white'></p>
    </div>
  )
}

export default Loader ;