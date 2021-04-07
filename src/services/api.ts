import axios from 'axios';

const api = process.env.NODE_ENV === "production" ? axios.create({
  baseURL: '/api',
}) : (
  axios.create({
    baseURL: 'http://localhost:3001/api',
  })
);

export default api;
