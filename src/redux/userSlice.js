import { createSlice } from "@reduxjs/toolkit";

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
        isProfileCompleted: false
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
        }
    }
});

export const { toggleLoggedin, setCoordinates, updateProfile } = userSlice.actions;
export default userSlice.reducer;
