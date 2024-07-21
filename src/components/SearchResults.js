import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Searchitems from './SearchItems';

const SearchResults = () => {
  const results = useSelector((store)=>store.result.results)
  if(!results || results.length===0) return

  console.log(results)

 

  if(results)  {const img = results.album ;
    console.log(img)

  }
  let counter = 0 ;

  // const img = result.tracks.items[0].album.images[0].url
  // const name = results.tracks.items[0].name ;
  // const duration= (results.tracks.items[0].duration_ms/(60*1000)).toFixed(2)

  //   const artist= results.tracks.items[0].artists[0].name;
  //   const singer = result.tracks.items[0].artists[1].name ;
  // console.log(img)
  // console.log(name)
  // console.log(duration) 
  // console.log(artist)
  // console.log(result.album.items[0].album_type)
  // console.log(JSON.stringify(results.album.items[0].album_type))

  
    
  return (
    <div className="w-full  mt-8 overflow-y-scroll h-[80vh]">
      <div className='flex flex-col justify-center items-center'>
      <p className="justify-self-start md:w-8/12 w-11/12    text-white py-4  font-semibold md:text-3xl text-2xl">Songs</p>

      {  results.tracks.items.slice(0,4).map((track, index) => (
        <Searchitems
          key={index}
          image={track.album?.images[0]?.url}
          name={track.name}
          artist={track.artists[0]?.name}
          duration = {track.duration_ms} 
          singer={track?.artists[1]?.name}
        />
      ))}
      </div>

      <div className='flex flex-col justify-center items-center'>
      <p className="justify-self-start md:w-8/12 w-11/12    text-white py-4  font-semibold md:text-3xl text-2xl mt-8">Albums</p>

      {results.album.items.slice(0,4).map((album, index) => (
        <Searchitems
          key={index}
          image={album?.images[0]?.url}
          name={album.name}
          artist={album.artists[0]?.name}
          type={album.album_type}
          singer={album?.artists[1]?.name}
          duration={null}

        />
      ))}
      </div>
      
    </div>
  );
};

export default SearchResults
