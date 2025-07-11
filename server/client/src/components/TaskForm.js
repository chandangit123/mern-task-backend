import React, { useState, useEffect } from "react";
import './TaskForm.css';


const TaskForm = ({ onSave, editingTask }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setAssignedTo(editingTask.assignedTo);
      setCreatedBy(editingTask.createdBy);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setAssignedTo("");
      setCreatedBy("");
      setStatus("pending");
    }
  }, [editingTask]);

  const smartAssign = () => {
    const options = ["Alice", "Bob", "Charlie", "David"];
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignee = assignedTo || smartAssign();
    onSave({ title, assignedTo: assignee, createdBy, status });
    setTitle("");
    setAssignedTo("");
    setCreatedBy("");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Created By"
        value={createdBy}
        required
        onChange={(e) => setCreatedBy(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assign To (leave blank for Smart Assign)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">{editingTask ? "Update" : "Create"} Task</button>
    </form>
  );
};

export default TaskForm;
