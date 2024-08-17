import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const inputRefs = useRef({});
  const navigate = useNavigate()

  const getOTPHandler = async() => {
  

    try{
      const data = checkParams()
      console.log(data)
      
  
      if(!data){
        return
      }
  

    const response = await fetch('http://localhost:4000/api/v1/auth/sendOTP',  {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: data.email} ) 
    });
    const resp = await response.json()
    console.log(resp)
    if(resp.success){
      //popup
    } else {
      //popup
    }
    
 
  }catch(err){
    console.log(err)
  }

     
  };


  function checkParams(){
    const fullName = inputRefs.current['full-name'].value;
    const email = inputRefs.current['email'].value;
    const contactNumber = inputRefs.current['contact-number'].value;
    const password = inputRefs.current['password'].value;
    const confirmPassword = inputRefs.current['confirm-password'].value;
    const otp = inputRefs.current['otp'].value;

    if(!fullName || !email || !contactNumber || !password || !confirmPassword){
      //toast
      return null
    }

    if(password!==confirmPassword){
      //toast
      return null
    }

    return {fullName , email , contactNumber , password , confirmPassword , otp}
  }



 
  async function submitHandler(){
    const data = checkParams()

    const response = await fetch('http://localhost:4000/api/v1/auth/signup',  {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: data.email , name:data.fullName , password:data.password , confirmPassword:data.confirmPassword , contactNumber:data.contactNumber , otp:data.otp} ) 
    });
    const resp = await response.json()
    console.log(resp)
    if(resp.success){
      navigate("/")
           
    } else {
      //popup the error
      alert(resp.message)

    }
    

  }
  


  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-tr from-[#181818] to-[#121111]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#212529] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['full-name'] = el)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['email'] = el)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="contact-number" className="block text-sm font-medium text-white">
            Contact Number
          </label>
          <input
            id="contact-number"
            name="contact-number"
            type="tel"
            required
            placeholder="Enter your contact number"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['contact-number'] = el)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['password'] = el)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            placeholder="Confirm your password"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['confirm-password'] = el)}
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 items-center">
          <button
            type="button"
            className="col-span-1 px-4 py-2 font-bold text-white outline-none bg-[#4e4b48] border-gray-300 rounded-md hover:bg-gray-900 focus:ring focus:ring-indigo-400"
            onClick={getOTPHandler}>
            Get OTP
          </button>
          <input
            id="otp"
            name="otp"
            type="text"
            required
            placeholder="Enter OTP"
            className="col-span-2 px-3 py-2 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['otp'] = el)}
          />
        </div>
        <div>
          <button
          
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-[#234459] rounded-md hover:bg-[#2d5771] focus:ring focus:ring-indigo-400"
           onClick={submitHandler}>
            Sign Up
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2  text-gray-300">OR</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="flex w-full pl-24 gap-2 py-2 font-bold text-black bg-[#234459]  outline-none border-gray-300 rounded-md hover:bg-[#2d5771] focus:ring focus:ring-indigo-400 items-center"
          >
            <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>

            <span className='px-1 text-white'>Signup with Google</span>
          </button>
        </div>
        <div className="mt-6 text-center text-white">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center text-red-500">
          {/* This message should appear conditionally if there's an
          {/* This message should appear conditionally if there's an error */}
          {<p>Invalid Otp</p>}
          {/* <p>{errorMessage}</p> */}
          </div>
      </div>
    </div>
  );
};

export default Signup;
