import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteTask } from "../utils/taskSlice";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const theme = useSelector((state) => state.theme.currentTheme); // Assuming you have theme in your Redux state
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    openModal();
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className={`w-3/4 min-h-screen p-6 `}>
      <div className="flex justify-end mb-6">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add New Task
        </button>
      </div>

      {isModalOpen && (
        <TaskModal onClose={closeModal} taskToEdit={taskToEdit} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`relative p-4 border rounded-lg shadow-lg ${
              theme === "light"
                ? "bg-white border-gray-200"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-2 ${
                theme === "light" ? "text-gray-900" : "text-gray-100"
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`mb-2 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {task.description}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              <strong>Category:</strong> {task.category}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              <strong>Priority:</strong> {task.priority}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              <strong>Due Date:</strong> {task.dueDate}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              <strong>Status:</strong>
              <span
                className={`font-semibold ${
                  task.status === "completed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {task.status}
              </span>
            </p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => openEditModal(task)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTrashAlt />
              </button>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
