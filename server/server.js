const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Initialize Express App
const app = express();

// Create HTTP Server and Attach Socket.IO
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log("✅ A user connected");

  socket.on("taskUpdated", (data) => {
    socket.broadcast.emit("taskUpdated", data); // Broadcast to others
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5003;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

