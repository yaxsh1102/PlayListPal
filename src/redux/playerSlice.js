import { createSlice } from "@reduxjs/toolkit"
const playerSlice = createSlice({
    name:"player" ,
    initialState:{
        nowPlaying:null ,
        queue:[]
    } ,
    reducers:{
        addNowPlaying:(state , action)=>{
            state.nowPlaying = action.payload

    }
}

})


export const {addNowPlaying} = playerSlice.actions 
export default playerSlice.reducer