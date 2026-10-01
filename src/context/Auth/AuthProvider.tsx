import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState("");

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function refreshAccessToken() {
      try {
        const response = await fetch("http://localhost:4000/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setAccessToken(data.accessToken);
      } catch {
        return;
      } finally {
        setIsAuthLoading(false);
      }
    }
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken , isAuthLoading  }}>
      {children}
    </AuthContext.Provider>
  );
}
