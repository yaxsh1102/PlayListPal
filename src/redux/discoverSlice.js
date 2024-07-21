import { createSlice } from "@reduxjs/toolkit";


const discoverSlice = createSlice({
    name:"discover" ,
    initialState:{
        albums:[] ,
        artists:[],
        tracks:[],
        playlist:[]
    }
    ,
    reducers:{
        addNewAlbums : (state , action)=>{
            state.albums = action.payload ;
        } ,
        addNewArtists : (state , action)=>{
            state.artists = action.payload ;
        },
        addNewTracks:(state , action)=>{
            state.tracks = action.payload ;

        },
        addNewPlaylist :(state , action)=>{
            state.playlist = action.payload

        }

    }
})

export const { addNewAlbums , addNewArtists , addNewTracks , addNewPlaylist} = discoverSlice.actions 
export default discoverSlice.reducer