/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";
import { api, setAuthToken } from "./api";

export const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);

  const setToken = (t) => {
    setTokenState(t);
    setAuthToken(t);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/api/users/login", { email, password });
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const signup = async (payload) => {
    const { data } = await api.post("/api/users/signup", payload);
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthCtx.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
