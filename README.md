# 🧠 Chandan Gupta Wabalar Project - Real-Time Task Board
A full-stack real-time collaborative task management board built using the MERN stack (MongoDB, Express, React, Node.js) with **Socket.IO** integration for instant updates. Includes unique logic features like **Smart Assign**, **Conflict Resolution**, and **Validation** for a modern team experience.

## 🚀 Live Demo

- **Frontend**: [[🌐 Vercel Deployment](https://your-vercel-url.vercel.app)](https://mern-task-backend-git-main-chandan-guptas-projects-51af7ec4.vercel.app)
- **Backend API**: [🛠️ Render Deployment] https://mern-task-backend-gceb.onrender.com

- ## 💡 Features

### 🔁 Real-Time Collaboration
- Live sync across tabs and devices using **Socket.IO**

### 🎯 Smart Assign
- Automatically assigns a task to the user with the **fewest active tasks**

### ⚠️ Conflict Handling
- If two users edit the same task simultaneously, shows both versions
- Offers **Merge** or **Overwrite** resolution options

### ✅ Validation Logic
- Task titles must be **unique per board**
- Task title cannot **match column name**

### 📦 Task Management
- Add, update, and delete tasks
- Update status: `pending`, `in-progress`, `completed`

---

## 🧰 Tech Stack

| Layer      | Tech                              |
|------------|-----------------------------------|
| Frontend   | React, Axios, Socket.IO-Client    |
| Backend    | Node.js, Express, Socket.IO       |
| Database   | MongoDB (Atlas or local)          |
| Realtime   | WebSockets via Socket.IO          |
| Deployment | Vercel (Frontend), Render (API)   |

---

## 🛠️ Setup Instructions (Local)

### Prerequisites
- Node.js & npm
- MongoDB (Atlas or Local)

### 1. Clone the Repositories

```bash
git clone https://github.com/chandangit123/mern-task-board.git
cd mern-task-board

📂 Project Structure
pgsql
Copy
Edit
client/
  └── src/
      ├── components/
      ├── contexts/
      ├── App.js

server/
  ├── models/
  ├── routes/
  ├── server.js


#Screenshots
<img width="1920" height="1080" alt="Screenshot 2025-07-11 181421" src="https://github.com/user-attachments/assets/ef6d1c71-7fbc-45c2-9a82-51df959eda16" />
<img width="1920" height="1080" alt="Screenshot 2025-07-11 181413" src="https://github.com/user-attachments/assets/949e397c-2654-4467-b943-8a41fdda6e0c" />
<img width="1920" height="1080" alt="Screenshot 2025-07-11 181350" src="https://github.com/user-attachments/assets/a582566d-5ca7-4f27-865f-99a03fbca0f8" />


✍️ Author
Chandan Gupta
GitHub: @chandangit123
Project Name: Wabalar Real-Time Task Board


This project is licensed under the MIT License. Feel free to use and modify.


Youtube video link for demo
https://youtu.be/6l25cEJQ4f

























