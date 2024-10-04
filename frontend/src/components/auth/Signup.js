import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendToast } from '../../redux/toastSlice';
import { GoogleLogin } from '@react-oauth/google';
import { setUser, toggleLoggedin } from '../../redux/userSlice';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const getOTPHandler = async () => {
    if (!fullName || !email || !password) {
      setError('All Fields Are Required');
      return;
    }
    try {
      setError('');
      const response = await fetch('https://playlistpal.onrender.com/api/v1/auth/sendOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const resp = await response.json();
      if (!resp.success) {
        setError(resp.message);
      } else {
        dispatch(sendToast('OTP Sent Successfully'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('https://playlistpal.onrender.com/api/v1/auth/google/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });
      const resp = await response.json();
      if (resp.success) {
        dispatch(sendToast('Google Signup Successful'));
        localStorage.setItem('db_token', resp.token);

        dispatch(setUser(resp.user))
        dispatch(toggleLoggedin(true));
        localStorage.setItem('db_token' , resp.token)
        navigate('/home');
      } else {
        setError(resp.message);
      }
    } catch (err) {
      dispatch(sendToast('Google Signup Error'));

    }
  };

  const handleGoogleLoginError = (err) => {
    dispatch(sendToast('Google Signup Error'));
  };

  const submitHandler = async () => {
    if (!fullName || !email || !password || !otp) {
      setError('Please fill all fields.');
      return;
    }

    const requestBody = { fullName, email, password, otp };
    try {
      setError('');
      const response = await fetch('https://playlistpal.onrender.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const resp = await response.json();
      if (resp.success) {
        dispatch(sendToast('Signup Successful'));
        navigate('/login');
      } else {
        setError(resp.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#000000] to-[#434343]">
      <div className="w-full md:max-w-md max-w-[24rem] p-8 space-y-6 rounded-lg shadow-xl bg-[#1d1d1e]">
        <h2 className="text-4xl font-bold text-center text-white">Sign Up</h2>
        {error && (
          <div className="text-center text-red-400  px-4 rounded">
            <p>{error}</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <button
              type="button"
              className="col-span-1 px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={getOTPHandler}
            >
              Get OTP
            </button>
            <input
              id="otp"
              type="text"
              required
              placeholder="Enter OTP"
              className="col-span-2 px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            onClick={submitHandler}
          >
            Sign Up
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
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
