import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlaying } from '../redux/playerSlice'

const MusiContainerItems = ({name , image , singer,url,artist,duration,type}) => {
    const song = { image, name, artist, duration, singer,type, url }
    const nowPlaying = useSelector((state)=>state.player.nowPlaying)
    const dispatch = useDispatch()

  return (
    <div className={`flex w-full text-white  border-b-[1px] border-b-black hover:opacity-50 cursor-pointer 
      ${nowPlaying.name===song.name ? 'opacity-50' : '' } `} 
    onClick={()=>{dispatch(addNowPlaying(song))}}>
        <img src={image} alt="12.png" className="xl:w-[3rem] xl:h-[3rem] w-[3rem] h-[3rem]"></img>
        <div className='xl:pl-6 lg:pl-3 xl:text-[0.9rem] lg:text-[0.9rem]'>
            <p>{name}</p>
            <p>{singer}</p>
        </div>

    </div>
  )
}

export default MusiContainerItems