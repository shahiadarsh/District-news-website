import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Footer = () => {
  const blocks = ['Gorakhpur', 'Deoria', 'Kushinagar', 'Basti', 'Maharajganj'];
  const { darkMode } = useTheme();

  return (
    <footer className={`${
      darkMode 
        ? 'bg-gray-800 text-gray-200' 
        : 'bg-blue-600 text-white'
    } p-8 transition-colors duration-300`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Blocks</h3>
            <ul className="space-y-2">
              {blocks.map(block => (
                <li key={block}>
                  <Link 
                    to={`/${block}`} 
                    className={`hover:text-blue-300 transition duration-200`}
                  >
                    {block}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3><a
            
              href="https://wa.me/6393251773"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                darkMode 
                  ? 'bg-green-700 hover:bg-green-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white px-4 py-2 rounded inline-block transition duration-200`}
            >
              WhatsApp: 6393251773
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="opacity-75">
            &copy; {new Date().getFullYear()} Gorakhpur News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;