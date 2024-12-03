import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { Helmet } from 'react-helmet';

const NoDataFound = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`flex items-center justify-center h-[60vh] ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
    <Helmet>
      <title>404 - Not Found | Siddharthnagar Times 24</title>
      <meta name="description" content="The requested content could not be found." />
      <meta property="og:title" content="404 - Not Found | Siddharthnagar Times 24" />
      <meta property="og:description" content="The requested content could not be found." />
    </Helmet>
    <div className={`text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-xl mb-8">The requested content could not be found.</p>
      <Link 
        to="/" 
        className={`px-6 py-2 rounded-full text-white font-semibold ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } transition duration-300`}
      >
        Go to Home Page
      </Link>
    </div>
  </div>
  );
};

export default NoDataFound;
