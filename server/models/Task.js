const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  assignedTo: { type: String, required: true },
  createdBy: { type: String, required: true },
  status: { type: String, default: "pending" },
  version: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
