import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

// 🔐 AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);

  // 🧾 Auto-load token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `${savedToken}`;
    }
  }, []);

  // 🔑 Login function example (you can expand this)
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `${data.token}`;
        toast.success("Logged in successfully!");
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  // 🚪 Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  const value = {
    axios,
    token,
    setToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
