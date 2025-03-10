import React, { useContext, useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import taskContext from "../contextApi/TaskContext";

function Educational() {
  const context = useContext(taskContext);
  const { tasks, specificTasks, deleteTask, editTask } = context;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchTasks = async () => {
        setLoading(true);
        try {
          await specificTasks("educational"); 
        } catch (error) {
          console.error("Error fetching tasks:", error);
        } finally {
          setLoading(false); 
        }
      };
  
      fetchTasks();
    }, []);

  const handleEdit = async (updatedTask) => {
    await editTask(updatedTask._id, updatedTask.title, updatedTask.description, updatedTask.tag);
  };

  const handleDelete = async (taskId) => {
   await deleteTask(taskId);
  };

  return (
    <div className="container mx-auto px-4 py-1 max-w-4xl">
      <h1 className="text-center mt-[30px] text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-serif">
        Your Educational Tasks
      </h1>

      {loading ? (
        <p className="text-center text-xl font-semibold mt-6">Loading Tasks...</p>
      ) : tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-center text-xl font-semibold mt-6">No tasks available</p>
      )}
    </div>
  );
}

export default Educational;
