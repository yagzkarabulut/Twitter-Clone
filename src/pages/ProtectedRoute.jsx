import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useState } from "react";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState();

  const onsub = onAuthStateChanged(auth, (user) => {
    setIsAuth(user ? true : false);
    return () => onsub();
  });
  if (isAuth === false) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
