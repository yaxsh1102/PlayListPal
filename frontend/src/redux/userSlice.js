import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        name: null,
        email: null,
        age: null,
        dateOfBirth: null,
        sexualOrientation: null,
        State: null,
        city: null,
        country: null,
        lat: null,
        lon: null,
        gender:null ,
        isProfileCompleted: false , 
        matchResults:null  ,
        friends:null ,
        requests:null ,
        imageUrl:null ,
        currentProfile:null  ,
        instagram:null ,
        telegram:null ,
        snapchat:null ,
        about:null ,

    },
    reducers: {
        toggleLoggedin: (state, action) => {
            state.isLoggedIn = action.payload;
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
            if(state.name && state.email && state.dateOfBirth && state.sexualOrientation && state.country && state.city && state.State && state.gender)
                state.isProfileCompleted=true ;
        } ,
        setMatchResults :(state , action)=>{
            state.matchResults=action.payload 
            state.currentProfile=state.matchResults[0]


        } ,
        setCurrentProfile:(state , action)=>{
            state.currentProfile=action.payload
        } , 
        moveCurrentProfile:(state , action)=>{
            if(action.payload==="requests"){
                state.requests.shift()
            }else if(action.payload==="friends"){
            state.friends.shift()
            } else {
                state.matchResults.shift()
            }

        } ,
        setReqandFriends:(state , action)=>{
            if(action.payload?.requests){
            state.requests=action.payload.requests
            }
            if(action.payload?.friends){
            state.friends=action.payload.friends
            }
        } ,
       
        setUser: (state, action) => {
            const { name, email, age, dateOfBirth, sexualOrientation, city, country ,  gender  , imageUrl , about , instagram , telegram , snapchat} = action.payload;
            state.name = name;
            state.email = email;
            state.age = age;
            state.dateOfBirth = dateOfBirth;
            state.sexualOrientation = sexualOrientation;
            state.State = action.payload.state;
            state.city = city;
            state.country = country;
            state.gender = gender;
            state.imageUrl = imageUrl;
            state.about=about ;
            state.instagram =instagram ;
            state.telegram = telegram ;
            state.snapchat=snapchat;
            if(state.name && state.email && state.dateOfBirth && state.sexualOrientation && state.country && state.city && state.State && state.gender)
                state.isProfileCompleted=true ;
        }

    }
});

export const { toggleLoggedin, setCoordinates, updateProfile ,setMatchResults , moveCurrentProfile , setReqandFriends , checkProfileStatus , setUser} = userSlice.actions;
export default userSlice.reducer;



