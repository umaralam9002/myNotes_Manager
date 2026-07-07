import React from 'react'
import taskContext from './TaskContext'
import { useState } from "react";

function TaskState(props) {

  const host = "https://mynotes-manager-backend.onrender.com"
  const notesInitial = []
  const [tasks, setTasks] = useState(notesInitial)
  const [users, setUser] = useState(null);



  // Get getuserdetails
  const getUserDetails = async ()=>{

    const response = await fetch(`${host}/api/auth/getuser`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        "auth-token" : localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json.user)
    setUser(json.user)
  }

  // Get ALL Tasks
  const getTasks = async () => {
    try {
      const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (Array.isArray(json)) {
        setTasks(json);
      } else {
        console.error("Expected an array but got:", json);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };




  const specificTasks = async (value) => {
    try {
      const response = await fetch(`${host}/api/tasks/fetchtasksbytag?tag=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (Array.isArray(json)) {
        setTasks(json);
      } else {
        console.error("Expected an array but got:", json);
      }
    } catch (error) {
      console.error("Error fetching specific tasks:", error);
    }
  };

// Add Task
  const addTask = async (title, description, tag, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
  
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await fetch(`${host}/api/tasks/addtask`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const task = await response.json();
      setTasks(tasks.concat(task));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };



  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log("Task deleted:", json);
  
      // Update the tasks state by filtering out the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


    // Edit a Task
    const editTask = async (id, title, description, tag) => {
      try {
        const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({ title, description, tag })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log("Task updated:", json);
    
       
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, title, description, tag } : task
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };

    const markTaskAsDone = async (id) => {
      try {
        const response = await fetch(`${host}/api/tasks/markdone/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
    
        const json = await response.json();
    
        if (json.success) {
          // Update the specific task's isDone property in state
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === id ? { ...task, isDone: true } : task
            )
          );
        }
      } catch (error) {
        console.error("Error marking task as done:", error);
      }
    };
    

  return (
    <taskContext.Provider value={{ users, tasks, getUserDetails, addTask, deleteTask, editTask, getTasks, specificTasks, markTaskAsDone }}>
    {props.children}
   </taskContext.Provider>
  )
}

export default TaskState
