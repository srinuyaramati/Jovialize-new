export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":

        sessionStorage.setItem("isloggedIn", true);
        sessionStorage.setItem("userId", action.payload.userId);
        sessionStorage.setItem("role", action.payload.role);
        sessionStorage.setItem("cityId", action.payload.cityId);
        sessionStorage.setItem("jovialize-token", `Bearer ${action.payload.token}`);
        
        return {
          ...state,
          isloggedIn: true,
          userId: action.payload.userId,
          token: `Bearer ${action.payload.token}`,
          role: action.payload.role,
          cityId: action.payload.cityId,
          userInfo: {
            roleId: action.payload.role,
            cityId: action.payload.cityId
          }
        };
      case "LOGOUT":
        sessionStorage.clear();
        return {
          ...state,
          isloggedIn: false,
          userId: null,
          token: "",
          role: "",
          cityId: "",
          userInfo: {}
        };
      default:
        return state;
    }
  };