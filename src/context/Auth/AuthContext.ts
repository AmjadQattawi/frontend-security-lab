import React, { createContext } from "react";

type AuthContextType = {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  isAuthLoading: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
