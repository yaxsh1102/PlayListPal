import { configureStore } from "@reduxjs/toolkit";
import resultsSlice from "./resultsSlice";
import discoverSlice from "./discoverSlice";
import toggleSlice from "./toggleSlice";
const appStore = configureStore({
    reducer:{
        result:resultsSlice,
        discover:discoverSlice ,
        toggle:toggleSlice
        
    }

})

export default appStore