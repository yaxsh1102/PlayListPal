import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const discoverSlice = createSlice({
    name:"discover" ,
    initialState:{
        albums:{} ,
        artists:{},
        tracks:[],
        playlist:{}
    }
    ,
    reducers:{
        addNewAlbums: (state, action) => {
            action.payload.albumsWithTracks.forEach(({ album, tracks }) => {
              const name = album.name;
              const artist = album.artists[0].name;
              const image = album.images[0].url;
              const songs = tracks.map((track) => ({
                name: track.name,
                url: track.preview_url,
                image: image,
                singer: track.artists[0].name,
                artist: track.artists.length > 1 ? track.artists[1].name : 'Solo',
              }));
      
              state.albums[name] = {
                songs: songs,
                artist: artist,
                image: image,
              };
            });
          },
        
          addNewArtists: (state, action) => {
            action.payload.artistsWithTracks.forEach(({ artist, tracks }) => {
                const name = artist.name;
                const image = artist.images[0]?.url;
                const genres = [artist.genres[0], (artist.genres.length > 1 ? artist.genres[1] : " ")];
              
                // Filter tracks to include only those with a non-null preview_url
                const validTracks = tracks.filter(track => track.preview_url !== null);
              
                // Add artist only if there is at least one track with a valid preview_url
                if (validTracks.length > 0) {
                  const songs = validTracks.map((track) => ({
                    name: track.name,
                    url: track.preview_url,
                    image: track.album.images[0]?.url,
                    singer: track.artists[0].name,
                    artist: track.artists.length > 1 ? track.artists[1].name : 'Solo',
                  }));
              
                  state.artists[name] = {
                    songs: songs,
                    image: image,
                    genres: genres
                  };
                }
              });
              
          },
        addNewTracks:(state , action)=>{
            state.tracks = action.payload ;

        },
        addNewPlaylist :(state , action)=>{
            console.log(action.payload)

            action.payload.playlistsWithTracks.forEach(({ playlist, tracks }) => {
                const name = playlist.name;
                const image = playlist.images[0].url;
                const songs = tracks.map((track) => ({
                  name: track.name,
                  url: track.preview_url,
                  image: track.album.images[0]?.url,
                  singer: track.artists[0].name,
                  artist: track.artists.length > 1 ? track.artists[1].name : 'Solo',
                }));
        
                state.playlist[name] = {
                  songs: songs,
                  image: image,
                };
              });
        }

    }
})

export const { addNewAlbums , addNewArtists , addNewTracks , addNewPlaylist} = discoverSlice.actions 
export default discoverSlice.reducer