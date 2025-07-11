const express = require("express");
const router = express.Router();

// Dummy GET route - returns all logs
router.get("/", (req, res) => {
  res.json([
    { id: 1, message: "Task created", timestamp: new Date() },
    { id: 2, message: "Task updated", timestamp: new Date() }
  ]);
});

// Dummy POST route - add a log
router.post("/", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Simulated log creation
  const newLog = {
    id: Date.now(),
    message,
    timestamp: new Date()
  };

  res.status(201).json(newLog);
});

module.exports = router;
