import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";

const isloggedIn = sessionStorage.getItem('isLoggedIn');
const token = sessionStorage.getItem("jovialize-token");
const userId = sessionStorage.getItem("userId");
const userType = sessionStorage.getItem("userType");
const userEmail = sessionStorage.getItem("userEmail");

const initialState = {
  isloggedIn: isloggedIn || false,
  userId: userId || null,
  token: token || "",
  userType: userType || null,
  userEmail: userEmail || ""
}

export const RootContext = createContext(initialState);

export function RootContextProvider(props) {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RootContext.Provider value={{state, dispatch}}>
      {props.children}
    </RootContext.Provider>    
  )
}