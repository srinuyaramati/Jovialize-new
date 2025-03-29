export const reducer = (state, action) => {
    switch (action.type) {

      case "LOGIN":
        
        window.localStorage.setItem('jovialize-token', action.payload.token);
        sessionStorage.setItem("jovialize-token", action.payload.token);
        sessionStorage.setItem("userId", action.payload.userId);
        sessionStorage.setItem("userType", action.payload.userType);
        sessionStorage.setItem("userEmail", action.payload.email);
        sessionStorage.setItem("isLoggedIn", true);

        return {
          ...state,
          isloggedIn: true,
          userId: action.payload.userId,
          token: action.payload.token,
          userType: action.payload.userType,
          userEmail: sessionStorage.getItem("userEmail")
        };

      case "LOGOUT":
        sessionStorage.clear();
        return {
          ...state,
          isloggedIn: false,
          userId: null,
          token: "",
          userType: null,
          userEmail: ""
        };
      default:
        return state;
    }
  };