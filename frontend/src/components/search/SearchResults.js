import React, { useState } from "react";
import { useSelector } from "react-redux";
import Searchitems from "./SearchItems";

const SearchResults = () => {
  const tracks = useSelector((store) => store.result.tracks);
  const albums = useSelector((store) => store.result.albums);
  const albumArtists = Object.keys(albums);

  const [songsCount, setSongsCount] = useState(4);
  const [albumsCount, setAlbumsCount] = useState(4);

  if (!tracks || tracks.length === 0) return null;

  const loadMoreSongs = () => {
    setSongsCount((prevCount) => prevCount + 4);
  };

  const loadMoreAlbums = () => {
    setAlbumsCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="pb-[8rem] w-full flex flex-col gap-8 mt-8 overflow-y-scroll h-[80vh]">
      <div className="w-full flex flex-col justify-center items-start md:pl-24 md:w-[67%]">
        <p className="w-full justify-self-start md:w-8/12 text-white py-4 font-semibold md:text-3xl pl-4 md:pl-0 text-2xl">
          Songs
        </p>

        {tracks.slice(0, songsCount).map((track, index) => ( 
          <Searchitems
            key={index}
            image={track.album?.images[0]?.url}
            name={track.name}
            artist={track.artists[0]?.name}
            duration={track.duration_ms}
            singer={track?.artists[1]?.name}
            url={track?.preview_url}
          />
        ))}
        {songsCount < tracks.length && (
          <div className="w-full justify-center items-center text-center mt-8 text-lg ">
            <button
              onClick={loadMoreSongs}
              className="text-white bg-[#1b1a1a]  py-1 px-4 rounded-full hover:bg-[#111111]"
            >
              See More
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-start md:pl-24 md:w-[67%]">
        <p className="justify-self-start md:w-8/12 w-11/12 text-white py-4 font-semibold md:text-3xl pl-4 md:pl-0 text-2xl">
          Albums
        </p>

        {albumArtists.slice(0, albumsCount).map((album, index) => (
          <Searchitems
            key={index}
            image={albums[album].image}
            name={album}
            artist={albums[album].artist}
            type={albums[album].type}
            singer={null}
            duration={null}
            isAlbum={true}
          />
        ))}
        {albumsCount < albumArtists.length && (
          <div className="w-full justify-center items-center text-center mt-8 text-lg ">
            <button
              onClick={loadMoreAlbums}
              className="text-white bg-[#1b1a1a]  py-1 px-4 rounded-full hover:bg-[#111111]"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
