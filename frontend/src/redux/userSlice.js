import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        name: "MusicHead",
        email: "",
        age: "",
        dob: "",
        sexualOrientation: "",
        State: "",
        city: "",
        country: "",
        lat: null,
        lon: null,
        gender:"" ,
        isProfileCompleted: false , 
        matchResults:null  ,
        friends:[] ,
        requets:[] ,
        currentProfile:null 

    },
    reducers: {
        toggleLoggedin: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        setCoordinates: (state, action) => {
            state.lat = action.payload.latitude;
            state.lon = action.payload.longitude;
        },
        updateProfile: (state, action) => {
            const { sexualOrientation, dob, State, city, country } = action.payload;
            state.dob = dob;
            state.sexualOrientation = sexualOrientation;
            state.city = city;
            state.State = State;
            state.country = country;
        } ,
        setMatchResults :(state , action)=>{
            state.matchResults=action.payload 
            state.currentProfile=state.matchResults[0]


        } ,
        setCurrentProfile:(state , action)=>{
            state.currentProfile=action.payload
        } , 
        moveCurrentProfile:(state , action)=>{
            state.matchResults.shift()
            state.currentProfile=state.matchResults[0]

        }

    }
});

export const { toggleLoggedin, setCoordinates, updateProfile ,setMatchResults , moveCurrentProfile} = userSlice.actions;
export default userSlice.reducer;
