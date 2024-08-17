import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user" ,
    initialState:{
        isLoggedIn:false ,
        name:"MusicHead"  ,
        email:"" ,
        age:"" , 
        dob:"" ,
        sexualOrientation:"" ,
        state :"" ,
        city:"" ,
        country:"" ,
        lat:"" , 
        lon:"" ,
    } ,
    reducers:{
        toggleLoggedin:(state , action)=>{
            state.isLoggedIn= !state.isLoggedIn

        }
    }
})

export const { toggleLoggedin } = userSlice.actions;
export default userSlice.reducer;
