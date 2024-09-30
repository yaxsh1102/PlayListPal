import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoggedin } from '../../redux/userSlice';
import { setUser } from '../../redux/userSlice';
import { sendToast } from '../../redux/toastSlice';
import { setCoordinates } from '../../redux/userSlice';

const Login = () => {
  
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  if (isLoggedIn) {
    navigate("/");
  }

  function loginHandler() {
    const email = inputRefs.current['email'].value;
    const password = inputRefs.current['password'].value;

    if (!email || !password) {
      setError("All Fields Are Required");
      return;
    }
    setError("");
    login(email, password);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
         
        },
        (error) => {
          dispatch(sendToast("Location Is Mandatory"))
         
        }
      );
    } else {
      dispatch(sendToast("Location Is Mandatory"))

    }
  };

  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const resp = await response.json();

      if (resp.success) {
        localStorage.setItem('db_token', resp.token);
        navigate("/");
        dispatch(toggleLoggedin());
        dispatch(setUser(resp.user))

      } else {
        setError(resp.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  }

 

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      
      const response = await fetch('http://localhost:4000/api/v1/auth/google/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });
  
      const resp = await response.json();

  
      if (resp.token) {
        localStorage.setItem('db_token', resp.token);
        navigate("/");
        dispatch(toggleLoggedin());
        dispatch(setUser(resp.user))

      } else {
        setError('Google login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during Google login. Please try again.');
    }
  };

  const handleGoogleLoginError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#000000] to-[#434343]">
      <div className="w-full md:max-w-md max-w-sm p-8 space-y-6 rounded-lg shadow-xl bg-[#1d1d1e]">
        <h2 className="text-4xl font-bold text-center text-white">Login</h2>
        {error && (
          <div className="text-center text-red-400  bg-opacity-50 py-2 px-4 rounded">
            <p>{error}</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ref={(el) => (inputRefs.current['email'] = el)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ref={(el) => (inputRefs.current['password'] = el)}
            />
          </div>
        
        </div>
        <div>
          <button
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-[#1d1d1e]">OR</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <GoogleLogin
            render={renderProps => (
              <button 
                onClick={renderProps.onClick}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  {/* Google icon paths */}
                </svg>
                Continue with Google
              </button>
            )}
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
        <div className="mt-6 text-center text-gray-400">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;