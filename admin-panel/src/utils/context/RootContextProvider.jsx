import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";

const isloggedIn = sessionStorage.getItem('isloggedIn');
const role = sessionStorage.getItem('role');
const cityId = sessionStorage.getItem('cityId');

const initialState = {
  isloggedIn: isloggedIn || false,
  userId: null,
  token: "",
  role: role || "",
  cityId: cityId || "",
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