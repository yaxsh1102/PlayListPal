import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    searchToggle: false,
    loading:false , 
  },
  reducers: {
    toggleSearch: (state) => {
      state.searchToggle = !state.searchToggle;
    },
    toggleLoading:(state , action)=>{
      state.loading=action.payload
    }
  },
});

export const { toggleSearch , toggleLoading } = toggleSlice.actions;
export default toggleSlice.reducer;