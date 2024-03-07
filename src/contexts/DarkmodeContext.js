import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";


const DarkModeContext = createContext();


function DarkModeContextProvider({children}){
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
        "isDarkMode"
      );

      useEffect(() => {
        if(!isDarkMode){
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }else if(isDarkMode){
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        }
      }, [isDarkMode])

      function toggleDarkMode(){
        setIsDarkMode(!isDarkMode);
      }

      return(
        <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
      )
}

function useDarkModeContext(){
    const context = useContext(DarkModeContext);
    if(context === undefined) throw new Error("dark mode context was used outside provider")
    return context;
}

export {useDarkModeContext, DarkModeContextProvider}