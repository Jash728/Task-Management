import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

const Tasks = () => {
  const username = useSelector((store) => store.auth);
  const theme = useSelector((store) => store.theme.currentTheme); // Get the current theme from the Redux store

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Tasks;
