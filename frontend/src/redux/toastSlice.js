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
                  background: 'linear-gradient(45deg, #000000cf, #282626a9)', 
                  color: 'white', 
                  padding: '16px',
                  borderRadius: '8px', 
                  fontWeight: 'bold', 
                  fontSize: '1rem', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                  zIndex: '50', 

                
                }
              }
            )

            state.toasts.push(id)
        }
    },
})

export const {sendToast} = toastSlice.actions;
export default toastSlice.reducer;

