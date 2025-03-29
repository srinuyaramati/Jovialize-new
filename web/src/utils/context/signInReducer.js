export const signInReducer = (state, action) => {
    switch (action.type) {

      case "OPEN":        
        return {
          ...state,
          isSignUp: action.payload?.isSignUp ||  false,
          showPopup: true,
          inputEmail: action.payload?.email || '' 
        };

      case "CLOSE":
        return {
          ...state,
          showPopup: false,
          isSignUp: false,
          inputEmail: ""
        };
        
      default:
        return state;
    }
  };