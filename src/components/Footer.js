import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import blocks from './Block';

// Utility function to scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Footer = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className={`${
      darkMode
        ? 'bg-gray-800 text-gray-200'
        : 'bg-blue-600 text-white'
    } p-8 transition-colors duration-300`}>
      <div className="container mx-auto ">
        <div className="flex justify-between gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Read</h3>
            <ul className="flex flex-row gap-8 justify-center">
              {blocks.map(block => (
                <li key={block}>
                  <button
                    onClick={() => handleNavigation(`/${block}`)}
                    className={`hover:text-blue-300 transition duration-200 `}
                  >
                    {block}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Contact Us</h3>
            <a
              href="https://wa.me/916393251773"
              target="_blank"
              rel="noopener noreferrer"
              className={
              //   `${
              //   darkMode
              //     ? 'bg-green-700 hover:bg-green-600'
              //     : 'bg-green-500 hover:bg-green-600'
              // }
               `text-white px-2 py-1 rounded inline-block transition duration-200`}
            >
              WhatsApp: 6393251773
            </a>
          </div>  
        </div>
        <div className="mt-8 text-center">
          <p className="opacity-75">
            &copy; {new Date().getFullYear()} Gorakhpur Times 24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
