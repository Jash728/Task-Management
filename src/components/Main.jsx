import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { useSelector } from "react-redux";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div className="w-3/4 min-h-screen p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add New Task
        </button>
      </div>

      {isModalOpen && <TaskModal onClose={closeModal} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
            <p className="mb-2 text-gray-700">{task.description}</p>
            <p className="mb-1">
              <strong>Category:</strong> <span className="text-gray-800">{task.category}</span>
            </p>
            <p className="mb-1">
              <strong>Priority:</strong> <span className="text-gray-800">{task.priority}</span>
            </p>
            <p className="mb-1">
              <strong>Due Date:</strong> <span className="text-gray-800">{task.dueDate}</span>
            </p>
            <p className="mb-1">
              <strong>Status:</strong> <span className={`font-semibold ${task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>{task.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
