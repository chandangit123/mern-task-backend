const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Smart Assign route
router.post("/smart-assign", async (req, res) => {
  try {
    const activeTasks = await Task.find({ status: { $ne: "completed" } });
    const userTaskCount = {};

    activeTasks.forEach(task => {
      userTaskCount[task.assignedTo] = (userTaskCount[task.assignedTo] || 0) + 1;
    });

    const users = await require("../models/User").find();
    let selectedUser = users[0];

    users.forEach(user => {
      const count = userTaskCount[user.username] || 0;
      const selectedCount = userTaskCount[selectedUser.username] || 0;
      if (count < selectedCount) selectedUser = user;
    });

    res.json({ assignedTo: selectedUser.username });
  } catch (err) {
    res.status(500).send("Smart assign failed");
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error fetching tasks");
  }
});

// Create new task
router.post("/", async (req, res) => {
  const { title, assignedTo, status, priority, createdBy } = req.body;
  try {
    const task = new Task({ title, assignedTo, status, priority, createdBy });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send("Error creating task");
  }
});

// Conflict-handled task update
router.put("/:id", async (req, res) => {
  try {
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) return res.status(404).send("Task not found");

    if (req.body.version !== existingTask.version) {
      return res.status(409).json({
        message: "Conflict detected",
        serverTask: existingTask
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, version: existingTask.version + 1 },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).send("Update failed");
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(400).send("Delete failed");
  }
});

module.exports = router;
