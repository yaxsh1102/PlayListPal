
import { createSlice, } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    current:0 , 
    nowPlaying: null,
    queue: null,
  },
  reducers: {
    addNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    initiateQueue: (state, action) => {
      state.queue= action.payload;
    },
    prevButton :(state , action)=>{
        if(state.current===0) {
            state.current= state.queue.length-1 ;
        } else{
            state.current-=1 ;
        }
        state.nowPlaying =state.queue[state.current] 
    } ,
    nextButton:(state , action)=>{
        if(state.current===state.queue.length-1){
            state.current= 0 ;


        } else {
            state.current+=1 ;
        }
        state.nowPlaying =state.queue[state.current] 

    } ,
    addToQueue : (state , action)=>{
      state.queue.unshift(action.payload)
    }
  
  },
});

export const { addNowPlaying, initiateQueue , prevButton , nextButton  , addToQueue} = playerSlice.actions;
export default playerSlice.reducer;
