import React from "react";
import { ToastContext } from "./ToastContext";

const ToastProvider = ({ children }) => {
  const [toast, setToast] = React.useState(null);

  const showToast = (message) => {
    setToast(message);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;