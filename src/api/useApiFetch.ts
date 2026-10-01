import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext";

export function useApiFetch() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must not be undefined");
  }
  const { accessToken, setAccessToken } = auth;

  async function refreshAccessToken() {
    const response = await fetch("http://localhost:4000/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    setAccessToken(data.accessToken);

    return data.accessToken;
  }

  async function apiFetch(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
      // check validata Aceess Token
    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) {
        return response;
      }
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
      return retryResponse;
    }

    return response;
  }
  return apiFetch;
}
