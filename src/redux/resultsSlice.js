import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name:"results" ,
    initialState:{
        results:null
    }
    ,reducers:{
    addResult:(state , action)=>{
        state.results = action.payload
    }
}
})
  
export const {addResult} =resultSlice.actions 
export default resultSlice.reducer