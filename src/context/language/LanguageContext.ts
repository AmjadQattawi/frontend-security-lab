import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const LanguageContext =
  createContext<LanguageContextType | undefined>(undefined);