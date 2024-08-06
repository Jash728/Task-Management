import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/authSlice';
import { toggleTheme } from '../utils/themeSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user)
    const theme = useSelector((store) => store.theme.currentTheme)
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    }

  return (
    <div className="w-1/4 min-h-screen bg-gray-100 dark:bg-gray-800 p-6 m-4 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">Hello, {user?.username}</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleToggleTheme}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
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
