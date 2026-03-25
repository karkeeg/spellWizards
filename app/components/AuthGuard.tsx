"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if we have a token in localStorage if the context is not yet updated
    const storedToken = localStorage.getItem("access_token");
    
    if (!isAuthenticated && !storedToken) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-dashboard-purple border-t-transparent"></div>
          <p className="text-sm font-bold text-dashboard-purple animate-pulse">
            Magical security check...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
