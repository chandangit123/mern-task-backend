import React from "react";
import { TaskProvider } from "./contexts/TaskContext";
import TaskBoard from "./components/TaskBoard";
import './App.css';


function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Real-Time Collaborative Task Board</h1>
        <TaskBoard />
      </div>
    </TaskProvider>
  );
}

export default App;
