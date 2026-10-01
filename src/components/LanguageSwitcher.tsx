import { useContext } from "react";
import { LanguageContext } from "../context/language/LanguageContext";

export default function LanguageSwitcher() {
  const myLang = useContext(LanguageContext);
  if (!myLang) {
    throw new Error("undefined");
  }
  const { language, setLanguage } = myLang;
  return (
    <div className="border-black m-14  space-y-2.5">
      <h1>{language}</h1>
      <button
        className="bg-green-300 rounded-2xl p-4"
        onClick={() => setLanguage("ar")}
      >
        Arabic{" "}
      </button>

      <button
        className="bg-green-300 rounded-2xl p-4"
        onClick={() => setLanguage("en")}
      >
        English{" "}
      </button>
    </div>
  );
}
