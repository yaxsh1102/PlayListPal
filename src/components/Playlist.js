// import React from 'react';
// import { useSelector } from 'react-redux';
// import Searchitems from './SearchItems';

// const Playlist = ({name}) => {
//   const likedSongs = useSelector((state) => state.playlist.likedSongs || []);

//   return (
//     <div className="pb-[8rem] w-full flex flex-col overflow-y-scroll h-[100vh] bg-gradient-to-tr from-[#000000] to-[#434343]">
//       <div className='w-full flex flex-col justify-center items-start md:pl-24 '>
//       <h1 className=" w-full text-[5rem] text-white font-bold mb-8 mt-16 border-b-[3px] border-black">{name}</h1>
//       <div className="w-full md:w-[80%]">
//         {likedSongs.length === 0 ? (
//           <p className="mt-[8rem] text-[3rem] text-gray-300  ">No liked songs yet.</p>
//         ) : (
//           likedSongs.map((song, index) => (
//             <Searchitems
//               key={index}
//               image={song.image}
//               name={song.name}
//               artist={song.artist}
//               duration={song.duration}
//               singer={song.singer}
//               type={song.type}
//               url={song.url}
//             />
//           ))
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Playlist;
