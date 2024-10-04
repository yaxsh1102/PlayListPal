import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    searchToggle: false,
    loading:false ,
    top:'7' 
    
  },
  reducers: {
    toggleSearch: (state) => {
      state.searchToggle = !state.searchToggle;
    },
    toggleLoading:(state , action)=>{
      state.loading=action.payload
    } ,
    setTop :(state , action)=>{
      state.top= action.payload
    }
  },
});

export const { toggleSearch , toggleLoading , setTop } = toggleSlice.actions;
export default toggleSlice.reducer;