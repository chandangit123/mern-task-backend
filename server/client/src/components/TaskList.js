import React, { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import "./TaskList.css";

const TaskList = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const [conflictData, setConflictData] = useState(null);

  const handleUpdate = async (task) => {
    const localVersion = { ...task, status: task.status === "pending" ? "in-progress" : "completed" };
    
    // Fetch latest from DB
    const res = await fetch(`/api/tasks/${task._id}`);
    const serverVersion = await res.json();

    // Check for conflict
    if (JSON.stringify(task) !== JSON.stringify(serverVersion)) {
      setConflictData({ localVersion, serverVersion });
    } else {
      updateTask(task._id, localVersion);
    }
  };

  const resolveConflict = (choice) => {
    const { localVersion, serverVersion } = conflictData;
    if (choice === "merge") {
      const merged = { ...serverVersion, ...localVersion };
      updateTask(serverVersion._id, merged);
    } else if (choice === "overwrite") {
      updateTask(serverVersion._id, localVersion);
    }
    setConflictData(null);
  };

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> — {task.status} — Assigned to: {task.assignedTo}
            <button onClick={() => handleUpdate(task)}>Update</button>
          </li>
        ))}
      </ul>

      {conflictData && (
        <div className="conflict-modal">
          <h3>⚠ Conflict Detected</h3>
          <p>Task was updated by someone else. Choose how to resolve:</p>
          <div className="conflict-details">
            <div>
              <h4>Your Version</h4>
              <pre>{JSON.stringify(conflictData.localVersion, null, 2)}</pre>
            </div>
            <div>
              <h4>Server Version</h4>
              <pre>{JSON.stringify(conflictData.serverVersion, null, 2)}</pre>
            </div>
          </div>
          <button onClick={() => resolveConflict("merge")}>Merge</button>
          <button onClick={() => resolveConflict("overwrite")}>Overwrite</button>
          <button onClick={() => setConflictData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
