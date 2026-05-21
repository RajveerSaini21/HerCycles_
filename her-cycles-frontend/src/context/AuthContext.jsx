// import React, { createContext, useState, useEffect } from "react";
// import api from "../utils/api";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- On mount: check token & fetch profile ---
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       api
//         .get("/auth/me")
//         .then((res) => {
//           if (res.data.success) {
//             setUser(res.data.user);
//           } else {
//             logout();
//           }
//         })
//         .catch(() => logout())
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // --- Register ---
//   const register = async (name, email, password) => {
//     try {
//       console.log("Attempting to register user:", { name, email });
//       const res = await api.post("/auth/register", { name, email, password });
//       console.log("Registration response:", res.data);
//       if (res.data.success) {
//         return true; // after register → go to /login
//       } else {
//         throw new Error(res.data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       if (error.response) {
//         // Server responded with error status
//         throw new Error(error.response.data.message || "Registration failed");
//       } else if (error.request) {
//         // Request was made but no response received
//         throw new Error("Network error - unable to connect to server");
//       } else {
//         // Something else happened
//         throw new Error(error.message || "Registration failed");
//       }
//     }
//   };

//   // --- Login ---
//   const login = async (email, password) => {
//     try {
//       console.log("Attempting to login user:", { email });
//       const res = await api.post("/auth/login", { email, password });
//       console.log("Login response:", res.data);
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         setUser(res.data.user);
//       } else {
//         throw new Error(res.data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       if (error.response) {
//         // Server responded with error status
//         throw new Error(error.response.data.message || "Login failed");
//       } else if (error.request) {
//         // Request was made but no response received
//         throw new Error("Network error - unable to connect to server");
//       } else {
//         // Something else happened
//         throw new Error(error.message || "Login failed");
//       }
//     }
//   };

//   // --- Logout ---
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         register,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }




import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟣 Check token on app mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.warn("Token invalid or expired:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data.success) return res.data;
      throw new Error(res.data.message);
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };




  // 💙 Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success) {
        const fullUser = { ...res.data.user, token: res.data.token };

        localStorage.setItem("user", JSON.stringify(fullUser));
        localStorage.setItem("token", res.data.token);

        setUser(fullUser);

      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    }
  };

  // 🔴 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}