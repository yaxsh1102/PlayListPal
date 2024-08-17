import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const toastSlice= createSlice({
    name:"toast",
    initialState:{
      toasts:[]
    },
    reducers:{
        sendToast:(state,action)=>{
          if (state.toasts.length>=3){
            toast.dismiss(state.toasts.shift())
          }
            const id = toast(action.payload,{
                style: {
                  background: 'linear-gradient(45deg, #000000cf, #282626a9)', // Gradient background
                  color: 'white', // Text color
                  padding: '16px', // Padding
                  borderRadius: '8px', // Rounded corners
                  fontWeight: 'bold', // Bold text
                  fontSize: '1rem', // Font size (adjust as needed)
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: shadow for better visibility
                  zIndex: '50', // Ensure the toast is above other elements
                }
              }
            )

            state.toasts.push(id)
        }
    },
})

export const {sendToast} = toastSlice.actions;
export default toastSlice.reducer;

