import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const AdminLogin = ({ setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'shivam' && password === '11111') {
      setIsAdmin(true);
      navigate('/catalog');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl ${
      darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
    } transition-colors duration-300`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            }`}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            }`}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button 
          type="submit" 
          className={`w-full py-2 rounded transition duration-200 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;