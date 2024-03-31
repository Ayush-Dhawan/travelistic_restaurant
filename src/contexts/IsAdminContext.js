import { createContext, useContext, useEffect, useState } from "react";


const IsAdminContext = createContext();

function IsAdminContextProvider({children}){
    const [isAdmin, setIsAdmin] = useState(false);
    const userState = JSON.parse(localStorage.getItem('userState'))|| '';

      const checkAdminStatus = (email) => {
        if (email === 'restaurant@travelistic.com'){
           setIsAdmin(true);}
        else {
          setIsAdmin(false);}
        console.log(isAdmin)
        
      };

      useEffect(()=>{
        if (userState.email === 'restaurant@travelistic.com'){
           setIsAdmin(true);}
        else {
          setIsAdmin(false);}
      }, [])

      console.log("user state: ", userState.email)

    return <IsAdminContext.Provider value={{isAdmin, checkAdminStatus}}>
        {children}
    </IsAdminContext.Provider>
}

function useIsAdminContext(){
    const context = useContext(IsAdminContext);
    if(context === undefined) throw new Error("is admin context was used outside provider")
    return context;
}

export {useIsAdminContext, IsAdminContextProvider}