import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: "playlist",
    initialState: {
        playList: {},
        likedSongs:[]
    },
    reducers: {
        createPlaylist: (state, action) => {
            const playListName = action.payload.playList.toUpperCase();
            if (!state.playList[playListName]) {
                state.playList[playListName] = [];
            }
            if (action.payload.song) {
                state.playList[playListName].push(action.payload.song);
            }
        },
        addToPlaylist: (state, action) => {
            const playListName = action.payload.playList.toUpperCase();
            if (state.playList[playListName]) {
                state.playList[playListName].push(action.payload.song);
            }
        },
        removeFromPlaylist: (state, action) => {
            const playListName = action.payload.playList.toUpperCase();
            if (state.playList[playListName]) {
                state.playList[playListName] = state.playList[playListName].filter(song => song.name !== action.payload.song.name);
            }
        },
        addToLikedSongs :(state,action)=>{
            console.log("Song RECIEVED");
            state.likedSongs.push(action.payload);
            console.log(action.payload);
            console.log(state.likedSongs[0]);
        },
        removeFromLikedSongs :(state,action)=>{
            state.likedSongs=state.likedSongs.filter(song => song.name !== action.payload.name);
        }
    }
});

export const { createPlaylist, addToPlaylist, removeFromPlaylist,addToLikedSongs,removeFromLikedSongs } = playlistSlice.actions;
export default playlistSlice.reducer;
