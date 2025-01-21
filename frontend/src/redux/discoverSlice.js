import { createSlice } from "@reduxjs/toolkit";
import decryptUrl from './../utils/decrypturl';

const discoverSlice = createSlice({
    name:"discover" ,
    initialState:{
        albums:{} ,
        artists:{},
        tracks:[],
        playlists:{},
 
    }
    ,
    reducers:{
        addNewAlbums: (state, action) => {
         
            action.payload.albumData.forEach(({ album, tracks }) => {
              const name = album.name;
              const artist = album.artist;
              const image = album.image;
              const songs = tracks.map((track) => ({
                image:track?.image ,
                name:track?.song ,
                artist:track?.music?.split(',')[0] ,
                duration:track?.duration ,
                singer: track?.singers?.split(',')[0] ,
                url:decryptUrl(track.encrypted_media_url)

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
              
                const validTracks = tracks.filter(track => {
                  return 'preview_url' in track && track.preview_url != null;
                });
              
                if (validTracks.length > 0) {
                  const songs = validTracks.map((track) => ({
                    name: track.name,
                    url: track.preview_url,
                    image: track.album.images[0]?.url,
                    singer: track.artists[0].name,
                    artist: track.artists.length > 1 ? track.artists[1].name : 'Solo',
                    duration : track.duration_ms

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
            state.tracks = action.payload.map((track) => ({
              image: track?.image,
              name: track?.song,
              artist: track?.music?.split(',')[0],
              duration: track?.duration,
              singer: track?.singers?.split(',')[0],
              url: decryptUrl(track.encrypted_media_url)
            }));

        },
        addNewPlaylist :(state , action)=>{

            action.payload.playlistsWithTracks.forEach(({ playlist, tracks }) => {
                const name = playlist.name;
                const image = playlist.image;
                const songs = tracks.map((track) => ({
                 

                  image:track?.image ,
                  name:track?.song ,
                  artist:track?.music?.split(',')[0] ,
                  duration:track?.duration ,
                  singer: track?.singers?.split(',')[0] ,
                  url:decryptUrl(track.encrypted_media_url)

                }));
        
                state.playlists[name] = {
                  songs: songs,
                  image: image,
                };
              });
        },
        
    }
})

export const { addNewAlbums , addNewArtists , addNewTracks , addNewPlaylist} = discoverSlice.actions 
export default discoverSlice.reducer