import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/authSlice';
import { toggleTheme } from '../utils/themeSlice';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.currentTheme); // Assuming you have theme in your Redux state
  const navigate = useNavigate();

  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`w-1/5 min-h-screen p-6 m-4 rounded-lg shadow-md md:shadow-lg flex flex-col justify-between ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-800'}`}>
      <div>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Hello, {user?.username[0].toUpperCase() + user?.username.substring(1)}</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleToggleTheme}
          className={`flex items-center justify-center w-full ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200'} py-2 px-4 rounded-md hover:${theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'} transition duration-200`}
        >
          {theme === 'light' ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
