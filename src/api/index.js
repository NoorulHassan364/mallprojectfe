import axios from "axios";

const api = axios.create({
  baseURL: "https://api.festacitymall.com.ng/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://apis.amuwomall.com.ng/api/v1",
  // baseURL: "http://3.83.132.10:5000/api/v1",
  // baseURL: "https://mallproject.herokuapp.com/api/v1",
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
