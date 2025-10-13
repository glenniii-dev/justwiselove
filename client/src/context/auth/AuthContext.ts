import { createContext } from "react";
import axios from "axios";

// 🧩 Define what the AuthContext will provide
export interface AuthContextType {
  axios: typeof axios;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 🧠 Create Auth context (start as undefined for safety)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
