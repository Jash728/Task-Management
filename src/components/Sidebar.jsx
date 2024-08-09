import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/authSlice";
import { toggleTheme } from "../utils/themeSlice";
import { useNavigate } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaList,
  FaCheck,
  FaExclamation,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ setFilter }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.currentTheme);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`w-1/5 min-h-screen p-6 m-4 rounded-lg shadow-md md:shadow-lg flex flex-col justify-between ${
        theme === "light" ? "bg-gray-300" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-6 ">
        <div className="flex items-center gap-10">
          <h2
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            Hello,{" "}
            {user?.username[0].toUpperCase() + user?.username.substring(1)}
          </h2>
          <button
            onClick={handleToggleTheme}
            className={`ml-4 flex items-center justify-center w-10 h-10 p-0 rounded-full ${
              theme === "light"
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-700 text-gray-200"
            } hover:${
              theme === "light" ? "bg-gray-300" : "bg-gray-600"
            } transition duration-200`}
          >
            {theme === "light" ? (
              <FaMoon className="text-xl" />
            ) : (
              <FaSun className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center w-full py-2 px-4 rounded-md ${
            theme === "light" ? "text-gray-800" : "text-gray-200"
          } hover:${
            theme === "light" ? "bg-gray-400" : "bg-gray-600"
          } transition duration-200`}
        >
          <FaHome className="mr-3" />
          All Tasks
        </button>
        <button
          onClick={() => setFilter("important")}
          className={`flex items-center w-full py-2 px-4 rounded-md ${
            theme === "light" ? "text-gray-800" : "text-gray-200"
          } hover:${
            theme === "light" ? "bg-gray-400" : "bg-gray-600"
          } transition duration-200`}
        >
          <FaExclamation className="mr-3" />
          Important!
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`flex items-center w-full py-2 px-4 rounded-md ${
            theme === "light" ? "text-gray-800" : "text-gray-200"
          } hover:${
            theme === "light" ? "bg-gray-400" : "bg-gray-600"
          } transition duration-200`}
        >
          <FaCheck className="mr-3" />
          Completed!
        </button>
        <button
          onClick={() => setFilter("doItNow")}
          className={`flex items-center w-full py-2 px-4 rounded-md ${
            theme === "light" ? "text-gray-800" : "text-gray-200"
          } hover:${
            theme === "light" ? "bg-gray-400" : "bg-gray-600"
          } transition duration-200`}
        >
          <FaList className="mr-3" />
          Do It Now
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
        >
          <FaSignOutAlt className="mr-2 text-lg" />
          <span className="text-lg font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
