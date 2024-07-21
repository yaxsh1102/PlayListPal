import { configureStore } from "@reduxjs/toolkit";
import resultsSlice from "./resultsSlice";
import discoverSlice from "./discoverSlice";
import toggleSlice from "./toggleSlice";
import playerSlice from "./playerSlice";
const appStore = configureStore({
    reducer:{
        result:resultsSlice,
        discover:discoverSlice ,
        toggle:toggleSlice ,
        player : playerSlice ,
        
    }

})

export default appStore