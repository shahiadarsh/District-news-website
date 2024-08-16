import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ isAdmin, setIsAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'All', path: '/' },
    { name: 'Gorakhpur', path: '/Gorakhpur' },
    { name: 'Deoria', path: '/Deoria' },
    { name: 'Kushinagar', path: '/Kushinagar' },
    { name: 'Basti', path: '/Basti' },
    { name: 'Maharajganj', path: '/Maharajganj' },
  ];

  return (
    <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'} shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Gorakhpur News</Link>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className={`mr-4 p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-500 text-white'} transition-colors duration-300`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${darkMode ? 'bg-gray-700' : 'bg-blue-500'}`}
          >
            <ul className="container mx-auto px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-4 rounded ${location.pathname === item.path ? (darkMode ? 'bg-gray-600' : 'bg-blue-400') : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isAdmin ? (
                <>
                  <li>
                    <Link to="/catalog" className="block py-2 px-4 rounded">Catalog</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsAdmin(false)}
                      className="w-full text-left py-2 px-4 rounded bg-red-500 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/admin" className="block py-2 px-4 rounded">Admin</Link>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      <nav className="hidden lg:block">
        <ul className="container mx-auto px-4 py-2 flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`py-2 px-4 rounded ${location.pathname === item.path ? (darkMode ? 'bg-gray-600' : 'bg-blue-500') : 'hover:bg-opacity-75'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {isAdmin ? (
            <>
              <li>
                <Link to="/catalog" className="py-2 px-4 rounded hover:bg-opacity-75">Catalog</Link>
              </li>
              <li>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/admin" className="py-2 px-4 rounded hover:bg-opacity-75">Admin</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;