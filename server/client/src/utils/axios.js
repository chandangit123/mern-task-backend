import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5002/api', // ✅ Use your backend port
});

export default instance;
