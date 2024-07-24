import React from 'react';

const ErrorPage = () => {
  return (
    <div className=" z-50 w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-tr from-[#000000] to-[#434343]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700">Page Not Found!</p>
        <p className="text-sm text-gray-500 mt-2">The page you are looking for does not exist or has been moved.</p>
        <a
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
