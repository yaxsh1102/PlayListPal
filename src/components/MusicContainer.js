import React from 'react'
import { useSelector } from 'react-redux'
import MusiContainerItems from './MusiContainerItems';
const MusicContainer = () => {
    const nowPlaying = useSelector((store)=>store.player.nowPlaying) ;
    const queue= useSelector((store)=>store.player.queue) ;
    console.log(queue )
  return (
    <div className="h-[100vh] flex lg:justify-end  md:justify-center w-full   bg-gradient-to-tr from-[#000000] to-[#434343] items-center overflow-y-hidden">
        <div className="flex md:w-[100%] w-full lg:justify-around  justify-center md:pb-0 pb-20 items-center">
        <div>
            <img src={nowPlaying.image} alt="1212.png" className="xl:w-[32rem] xl:h-[32rem] lg:w-[28rem] lg:h-[27rem] md:w-[32rem] md:h-[32rem] sm:w-[28rem] sm:h-[28rem] h-[18rem] w-[18rem] lg:pl-6"></img>
        </div>
        <div className=" flex flex-col xl:h-[45rem] lg:w-[28rem] md:h-[40rem]  items-center py-6 overflow-y-scroll no-scrollbar">
          
                <div className='xl:h-[8rem]  lg:h-[6rem] lg:flex hidden text-white justify-around items-center w-full'>
                    <p className="lg:text-2xl md:text-1xl">Playing Next</p>
                    <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path></svg>
                    </p>
               
                </div>
                <div className=" lg:flex hidden flex-col xl:w-full lg:w-[80%] lg:gap-y-4  gap-y-2 xl:pt-0 lg:pt-0 px-0   overflow-y-scroll no-scrollbar">
                {queue.map((element, index) => {
                                     return (
                                               <MusiContainerItems 
                                                name={element.name} 
                                                        image={element.image} 
                                                        singer={element.singer} 
                                                        key={index}
                                                        />
                                                         );
})}
        </div>
        </div>

      
        

        </div>
    </div>
  )
}

export default MusicContainer