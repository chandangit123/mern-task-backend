import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

export const TaskContext = createContext();

const socket = io("http://localhost:5003"); // update if backend is running on a different port

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskUpdated", () => {
      fetchTasks();
    });

    return () => socket.disconnect();
  }, []);

  const addTask = async (taskData) => {
    const res = await axios.post("/api/tasks", taskData);
    setTasks((prev) => [res.data, ...prev]);
    socket.emit("taskUpdated");
  };

  const updateTask = async (id, updatedData) => {
    await axios.put(`/api/tasks/${id}`, updatedData);
    fetchTasks();
    socket.emit("taskUpdated");
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
