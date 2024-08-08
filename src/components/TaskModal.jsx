import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { addTask, updateTask } from "../utils/taskSlice";

const TaskModal = ({ onClose, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("high");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskToEdit) {
      dispatch(
        updateTask({
          ...taskToEdit,
          title,
          description,
          category,
          priority,
          dueDate,
          status,
        })
      );
    } else {
      dispatch(
        addTask({
          id: new Date().getTime(),
          title,
          description,
          category,
          priority,
          dueDate,
          status,
          username: user.username,
        })
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg relative ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{taskToEdit ? "Edit Task" : "Add New Task"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-blue-500 bg-white' : 'border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-blue-500 bg-white' : 'border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-blue-500 bg-white' : 'border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100'}`}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-blue-500 bg-white' : 'border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100'}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-blue-500 bg-white' : 'border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'border-gray-300 focus:ring-blue-500 bg-white' : 'border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100'}`}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md transition duration-200 ${theme === 'light' ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-gray-600 text-gray-300 hover:bg-gray-700'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
