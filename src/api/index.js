import axios from "axios";

const api = axios.create({
  baseURL: "https://mallproject.herokuapp.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  // baseURL: process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = token ? `Bearer ${token}` : undefined;
  return config;
});

// api.interceptors.response.use(null, error => {
//     console.log('interceptors error: ', error);
//     return Promise.reject(error);
// })

export default api;
