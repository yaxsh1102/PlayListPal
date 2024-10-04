import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className="loader lg:w-[10rem] w-[6rem]   aspect-[1/1]"  ></div>
    <p className='text-4xl text-white'></p>
    </div>
  )
}

export default Loader ;