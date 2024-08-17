import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: "playlist",
    initialState: {
        playlist: {},
        likedSongs:[]
    },
    reducers: {
        createPlaylist: (state, action) => {
            const playlistName = action.payload.playlist.toUpperCase();
            console.log(playlistName)
            if (!state.playlist[playlistName]) {
                state.playlist[playlistName] = [];
            }
            if (action.payload.song) {
                state.playlist[playlistName].push(action.payload.song);
            }
        },
        deletePlaylist : (state,action)=>{
            const playlistName = action.payload
            if (state.playlist[playlistName]) {
                delete state.playlist[playlistName]
            }
        },
        renamePlaylist : (state,action)=>{
            const oldName = action.payload.oldName
            const newName = action.payload.newName
            if (state.playlist[oldName]) {
                state.playlist[newName] = state.playlist[oldName]
                delete state.playlist[oldName]
            }
        },
        addToPlaylist: (state, action) => {
            const playlistName = action.payload.playlist.toUpperCase();
            if (state.playlist[playlistName]) {
                state.playlist[playlistName].push(action.payload.song);
            }
        },
        removeFromPlaylist: (state, action) => {
            const playlistName = action.payload.playlist.toUpperCase();
            if (state.playlist[playlistName]) {
                state.playlist[playlistName] = state.playlist[playlistName].filter(song => song.name !== action.payload.name);
            }
        },
        addToLikedSongs :(state,action)=>{
            state.likedSongs.push(action.payload);
        },
        removeFromLikedSongs :(state,action)=>{
            state.likedSongs=state.likedSongs.filter(song => song.name !== action.payload.name);
        },
        setSelectedSong : (state , action)=>{
        state.selectedSong = action.payload
     }
    }
});

export const { createPlaylist,deletePlaylist,renamePlaylist, addToPlaylist, removeFromPlaylist,addToLikedSongs,removeFromLikedSongs,setSelectedSong } = playlistSlice.actions;
export default playlistSlice.reducer;