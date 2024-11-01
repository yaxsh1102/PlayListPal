import React from 'react'

const Loader = ({text=''}) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
    <div className="loader lg:w-[10rem] w-[6rem]   aspect-[1/1]"  ></div>
    <p className='text-sm text-white'>{text}</p>
    </div>
  )
}

export default Loader ;