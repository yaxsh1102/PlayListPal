import { configureStore } from "@reduxjs/toolkit";
import resultsSlice from "./resultsSlice";
import discoverSlice from "./discoverSlice";
import toggleSlice from "./toggleSlice";
import playerSlice from "./playerSlice";
import playlistSlice from "./playlistSlice";
import toastSlice from "./toastSlice";

const appStore = configureStore({
    reducer:{
        result:resultsSlice,
        discover:discoverSlice ,
        toggle:toggleSlice ,
        player : playerSlice ,
        playlist : playlistSlice,
        toast:toastSlice,
    }
})

export default appStore