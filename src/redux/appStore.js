import { configureStore } from "@reduxjs/toolkit";
import resultsSlice from "./resultsSlice";
import discoverSlice from "./discoverSlice";
import toggleSlice from "./toggleSlice";
import playerSlice from "./playerSlice";
import playlistSlice from "./playlistSlice";

const appStore = configureStore({
    reducer:{
        result:resultsSlice,
        discover:discoverSlice ,
        toggle:toggleSlice ,
        player : playerSlice ,
        playlist : playlistSlice
    }
})

export default appStore