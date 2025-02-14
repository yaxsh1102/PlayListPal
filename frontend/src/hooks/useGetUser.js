import { useEffect } from "react"
import { useDispatch  , useSelector} from "react-redux"
import { setUser, toggleLoggedin } from "../redux/userSlice"

const useGetUser = ()=>{
  const isLoggedIn = useSelector((store)=>store.user.isLoggedIn)
  const name = useSelector((store)=>store.user.name) 
  const dispatch = useDispatch()

    async function getUser(){
        try{
            if(!localStorage.getItem('db_token')){
                return 
            }
            const data = await fetch("https://playlist-pal.duckdns.org/backend/api/v1/auth/getUserDetails" , {
                method:"get" ,
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${localStorage.getItem('db_token')}`
                  },
                
            })
    
            const response = await data.json() ;
           
            if(response.success){
            dispatch(setUser({name:response.data.name , email:response.data.email , ...response.data.datingProfile}))
            dispatch(toggleLoggedin(true))
    
        }else{
            window.location.assign("/login");
        }
    }
        catch(err){

            window.location.assign("/login");


        }

       

}

useEffect(()=>{
   !name &&  getUser()
},[isLoggedIn])

}

export default useGetUser 