
import React from 'react'
import { useDispatch  , useSelector} from 'react-redux';
import { toggleSearch } from '../redux/toggleSlice';
import { toggleLoggedin } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { sendToast } from '../redux/toastSlice';
import { IoMdLogOut } from "react-icons/io";



const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = useSelector((store)=>store?.user?.name)
  const imageUrl = useSelector((store)=>store?.user?.imageUrl)

  function clickHandler (){ 
     dispatch(toggleSearch())
  }

  function logoutHandler(){
    dispatch(sendToast("Logged Out"))

    localStorage.removeItem("db_token") 
    dispatch(toggleLoggedin())

    navigate("/login")
    window.location.reload();




  } 
  return (
    <div className="h-[6.5rem] w-full flex md:flex-row md:justify-between  items-center bg-transparent pl-[20%] md:px-10 ">
      <p className=" lg:text-xl md:text-md  md:flex hidden text-slate-300">
        Playing&nbsp;for <span className="font-bold text-indigo-500">&nbsp; {name?.split(' ')[0]}👋🏻</span>  
      </p>
      <div className="flex lg:justify-end lg:gap-x-4 md:gap-x-2 md:justify-start justify-evenly  items-center  md:w-7/12 lg:w-6/12 w-8/12 md:ml-0 ml-6 lg:mr-[12rem] md:mr-[2.2rem]">
        <p onClick={clickHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f4ecec" viewBox="0 0 256 256" className="lg:w-8 lg:h-8 md:w-8 md:h-8 w-8  h-8">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </p>
        <button className="lg:w-[10rem]  lg:h-[2.5rem]   md:w-[8rem] md:h-[2rem] sm:w-[8rem] sm:h-[2rem] w-[8rem] h-[2rem]  bg-indigo-600 text-sm md:text-base font-bold mx-2 rounded text-white hover:bg-indigo-700" onClick={()=>navigate("/matches")}>
          Find Match!
        </button>
        <div  onClick={logoutHandler} className='md:mr-[4rem] hover:cursor-pointer'> 
        {/* <img src={""+imageUrl+""} alt='logo' className='lg:w-[2.5rem] lg:h-[2.5rem] md:w-[2.5rem] md:h-[2.5rem]  w-8 h-8 rounded-full' /> */}
        <IoMdLogOut className="text-white lg:w-[2.15rem] lg:h-[2.15rem] md:w-[2.15rem] md:h-[2.15rem]  w-8 h-8 " ></IoMdLogOut>
        </div>
      </div>
    </div>
  ) 
}

export default Navbar;

