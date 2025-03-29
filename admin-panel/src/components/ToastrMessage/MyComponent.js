import React from "react";
import { useContext } from "react";
import { ToastContext } from "./ToastContext";

const MyComponent = () => {
  const { toast, showToast, hideToast } = useContext(ToastContext);

  // Show a toast message
  showToast("This is a toast message!");

  // Hide the toast message
  hideToast();

  return (
    <div>
      <h1>My Component</h1>
      {toast && <div>{toast}</div>}
    </div>
  );
};

export default MyComponent;