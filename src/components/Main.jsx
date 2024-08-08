import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteTask } from "../utils/taskSlice";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useSelector((state) => state.theme.currentTheme);
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

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterPriority === "" || task.priority === filterPriority) &&
      (filterStatus === "" || task.status === filterStatus) &&
      (filterCategory === "" || task.category === filterCategory) &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div
      className={`w-3/4 min-h-screen p-6 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className={`py-2 px-4 rounded-lg shadow-md ${
              theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-800 border-gray-700 text-gray-100"
            }`}
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`py-2 px-4 rounded-lg shadow-md ${
              theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-800 border-gray-700 text-gray-100"
            }`}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`py-2 px-4 rounded-lg shadow-md ${
              theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-800 border-gray-700 text-gray-100"
            }`}
          >
            <option value="">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-4 py-2 rounded-md border ${
              theme === "light"
                ? "bg-white text-gray-900 border-gray-300"
                : "bg-gray-700 text-gray-100 border-gray-600"
            } focus:outline-none focus:ring-2 ${
              theme === "light" ? "focus:ring-blue-500" : "focus:ring-blue-400"
            }`}
          />
          <button
            onClick={openModal}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Add New Task
          </button>
        </div>
      </div>

      <hr
        className={`my-4 ${
          theme === "light" ? "border-gray-300" : "border-gray-700"
        }`}
      />

      {isModalOpen && (
        <TaskModal onClose={closeModal} taskToEdit={taskToEdit} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task, index) => (
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
