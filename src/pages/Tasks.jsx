import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../utils/taskSlice";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Tasks = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.userId);

  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export default Tasks;
