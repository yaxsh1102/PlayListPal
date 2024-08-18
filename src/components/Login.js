import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch  , useSelector} from 'react-redux';
import { toggleLoggedin } from '../redux/userSlice';

const Login = () => {
  const isLoggedIn = useSelector((store)=>store.user.isLoggedIn) ;

  const inputRefs = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const [error , setError] = useState('')

  if(isLoggedIn){
    console.log("hiii")
    console.log(isLoggedIn) 
    navigate("/") ;
  }


  function loginHandler() {
  
    const email = inputRefs.current['email'].value;
    const password = inputRefs.current['password'].value;

    if (!email || !password) {
      setError("All Fields Are Required")
      return;
    }
    setError("")
    login(email, password);
  }

  async function login(email, password) {
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ email, password }),
    });

    const resp = await response.json();

    if (resp.success) {
      localStorage.setItem('db_token' , resp.token)
      localStorage.setItem('email' , resp.email)
      dispatch(toggleLoggedin())
      navigate("/");
      window.location.reload()
    } else {
       setError(resp.message)
    }
  }

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      
      // Send the token to your backend for verification
      const response = await fetch('http://localhost:4000/api/v1/auth/google/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });
  
      const resp = await response.json();
      console.log(resp)
  
      if (resp.token) {
        localStorage.setItem('db_token', resp.token);
        localStorage.setItem('email' , resp.email)

        navigate("/");
        dispatch(toggleLoggedin())

      } else {
        console.log('Login Failed');
      }
    } catch (error) {
      console.log('Login Failed', error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#181818] to-[#121111]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#212529] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <div className="text-center text-red-500">

<p>{error}</p>
</div>
        <div>
          <label htmlFor="email-or-phone" className="block text-sm font-medium text-white">
            Email or Phone Number
          </label>
          <input
            id="email-or-phone"
            name="email-or-phone"
            type="text"
            required
            placeholder="Enter your email or phone number"
            ref={(el) => (inputRefs.current['email'] = el)}
            className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#4e4b48] border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
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
            ref={(el) => { inputRefs.current['password'] = el; }}
            className="outline-none bg-[#4e4b48] w-full px-3 py-2 mt-1 text-black border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
          />
          <div className="mt-2 text-sm text-left">
            <Link to="/forgot-password" className="text-indigo-400 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-[#234459] rounded-md hover:bg-[#2d5771] focus:ring focus:ring-indigo-400"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-300">OR</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <GoogleLogin
           render={renderProps => (
            <button onClick={renderProps.onClick}  style={{
              width: '100%',              
              backgroundColor: '#4285F4'  
            }}>This is my custom Google button</button>
          )}
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            className="w-64 p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
            logo={<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>}
            buttonText="Login with Google"
          />
        </div>
        <div className="mt-6 text-center text-white">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center text-red-500">
          {/* This message should appear conditionally if the credentials are wrong */}
          {/* Invalid email or password. Please try again. */}
        </div>
      </div>
    </div>
  );
};

export default Login;
