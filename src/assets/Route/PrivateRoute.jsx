import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import { LoginRegister } from "../Component/LoginRegister/LoginRegister";

// children means here <Order />, we have <Order /> component inside PrivateRoute.
// Every time you try to go to /Order, PrivateRoute will check if the user is logged in or not.

const PrivateRoute = ({ children }) => {
  const { user ,loading} = useContext(AuthContext);

  if(loading){
    return 
  }
  if (user) {
    console.log("✅ User found — showing protected page");
    return children;
  }

  console.log("🚫 No user — redirecting to /Login");
  // return <Navigate state={location?.pathname} to="/LoginRegister" replace />;
  return <Navigate to="/LoginRegister" state={{ from: location.pathname }} replace />;

};

export default PrivateRoute;