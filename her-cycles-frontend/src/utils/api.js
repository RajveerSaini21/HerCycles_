// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// // Attach token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;





// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5001/api",
//   withCredentials: true,
// });

// // ✅ Attach token from either `user` or `token` key
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       delete config.headers.Authorization;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;