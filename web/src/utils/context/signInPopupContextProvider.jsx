import { createContext, useReducer } from "react";
import { signInReducer } from "./signInReducer";

const signInPopupinitialState = {
  showPopup: false,
  isSignUp: false,
  email: ""
}

export const SignInContext = createContext(signInPopupinitialState);

export function SignInContextProvider(props) {

  const [state, signInDispatch] = useReducer(signInReducer, signInPopupinitialState);

  return (
    <SignInContext.Provider value={{state, signInDispatch}}>
      {props.children}
    </SignInContext.Provider>    
  )
}