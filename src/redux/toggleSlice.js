import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    searchToggle: false,
  },
  reducers: {
    toggleSearch: (state) => {
      state.searchToggle = !state.searchToggle;
    },
  },
});

export const { toggleSearch } = toggleSlice.actions;
export default toggleSlice.reducer;