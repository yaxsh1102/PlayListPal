import { createSlice } from "@reduxjs/toolkit";

const discoverSlice = createSlice({
    name:"discover" ,
    initialState:{
        albums:{} ,
        artists:{},
        tracks:[],
        playlists:{},
        isLoading: false ,
        tokenReady:false ,
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
                duration : track.duration_ms
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
            state.tracks = action.payload ;

        },
        addNewPlaylist :(state , action)=>{

            action.payload.playlistsWithTracks.forEach(({ playlist, tracks }) => {
                const name = playlist.name;
                const image = playlist.images[0].url;
                const songs = tracks.map((track) => ({
                  name: track.name,
                  url: track.preview_url,
                  image: track.album.images[0]?.url,
                  singer: track.artists[0].name,
                  artist: track.artists.length > 1 ? track.artists[1].name : 'Solo',
                  duration : track.duration_ms

                }));
        
                state.playlists[name] = {
                  songs: songs,
                  image: image,
                };
              });
        },
        setLoading: (state, action) => {
          state.isLoading = action.payload;
        } ,
        setTokenReady:(state , action)=>{
          state.tokenReady=true
        }

    }
})

export const { addNewAlbums , addNewArtists , addNewTracks , addNewPlaylist,setLoading , setTokenReady} = discoverSlice.actions 
export default discoverSlice.reducer