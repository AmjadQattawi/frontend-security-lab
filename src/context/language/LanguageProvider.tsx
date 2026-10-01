import { useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./LanguageContext";



 export function LanguageProvider( {children} : {children:ReactNode} ){
    const [language , setLanguage ] = useState<Language>("en");

    return(
        <LanguageContext.Provider value={ {language , setLanguage} }>
            {children}
        </LanguageContext.Provider>
    )

 }