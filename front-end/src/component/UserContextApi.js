import React, { createContext, useState} from "react";


// create context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  
  const [auth, setAuth] = useState({ isAuth: false, type: "" });
  

 
  

  return (
    <UserContext.Provider value={{ auth,setAuth}}>
      {children}
    </UserContext.Provider>
  );
};