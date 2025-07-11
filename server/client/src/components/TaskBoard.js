import React from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import './TaskBoard.css';


const TaskBoard = () => {
  return (
    <div className="task-board">
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskBoard;
