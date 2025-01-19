import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name:"results" ,
    initialState:{
        tracks:null ,
        albums:{}
    }
    ,reducers:{
    addTracks:(state , action)=>{
      console.log(action.payload)
        state.tracks = action.payload 
    } , 

  

    addAlbums:(state , action)=>{
        state.albums={}
        action.payload.albumsWithTracks.forEach(({ album, tracks }) => {
            const name = album.name;
            const artist = album.artists[0].name;
            const image = album.images[0].url;
            const type = album.album_type;
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
              type :type
            }; 
          });
        

    }
}
})
  
export const {addAlbums , addTracks} =resultSlice.actions 
export default resultSlice.reducer