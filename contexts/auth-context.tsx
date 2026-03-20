"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthResponse } from "@/services/auth.service";

// Types
interface AuthState {
  token: string | null;
  parentId: string | null;
  onboardingStatus: "completed" | "pending" | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (data: AuthResponse) => void;
  logout: () => void;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    parentId: null,
    onboardingStatus: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const parentId = localStorage.getItem("parent_id");
    const onboardingStatus = localStorage.getItem("onboarding_status") as
      | "completed"
      | "pending"
      | null;

    if (token && parentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuth({
        token,
        parentId,
        onboardingStatus,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (data: AuthResponse) => {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("parent_id", data.parent_id);
    localStorage.setItem("onboarding_status", data.onboarding_status);

    setAuth({
      token: data.access_token,
      parentId: data.parent_id,
      onboardingStatus: data.onboarding_status,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("parent_id");
    localStorage.removeItem("onboarding_status");

    setAuth({
      token: null,
      parentId: null,
      onboardingStatus: null,
      isAuthenticated: false,
    });

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
