import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: 'https://admissionbe.herokuapp.com/api/v1',

  // baseURL: 'http://localhost:5000/api/v1',
  // baseURL: `http://${window.location.hostname}:8000/api/v1/`,
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
