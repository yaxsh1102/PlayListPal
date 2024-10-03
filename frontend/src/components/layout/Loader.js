import React from 'react'
import { useDispatch } from 'react-redux';
import { setTokenReady } from '../../redux/discoverSlice';

const Loader = () => {
  const dispatch = useDispatch()
  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className="loader lg:w-[10rem] w-[6rem]   aspect-[1/1]"  onClick={()=>{dispatch(setTokenReady(Math.random()))}}></div>
    <p className='text-4xl text-white' onClick={()=>{dispatch(setTokenReady(Math.random()))}}></p>
    </div>
  )
}

export default Loader ;