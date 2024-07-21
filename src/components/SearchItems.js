import React from 'react'

const Searchitems = ({image ,name , artist , duration , singer , type}) => {
  const dur= (duration/((60*1000))).toFixed(2)
  return (
    <div className="flex text-white  items-center gap-x-4 md:w-8/12 w-11/12  bg-transparent  border-b-[1px] group border-black mt-2 ">
      <img src={image} alt="image.logo"   className="w-20 h-20 ml-2 p-1 group-hover:opacity-50">
      </img>
      <div className='px-4 group-hover:text-gray-600'>
        <p className=" md:text-lg lg:text-xl xl:text-2xl group-hover:text-opacity-50 ">{name}</p>
        <div className=' md:flex hidden  gap-x-4 '>
        { artist &&  <p>{artist}   </p>}
          {  singer && <p>• {singer}</p>}
         


         { duration ? (<p>• {dur}</p>) : (<p>• {type}</p>)}
        </div>
      </div>

    
        
    </div>
  )
}

export default Searchitems