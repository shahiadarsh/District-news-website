import React from 'react';
import { useTheme } from '../ThemeContext';

const Spinner = () => {
  const { darkMode } = useTheme();

  return (
    <div className="flex justify-center items-center p-5">
      <div className={`relative w-10 h-10 ${darkMode ? 'text-gray-200' : 'text-gray-300'}`}>
        {/* Outer circle with a spinning effect */}
        <div className="absolute w-full h-full border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
        {/* Inner circle for a layered effect */}
        <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin delay-200"></div>
      </div>
    </div>
  );
};

export default Spinner;
