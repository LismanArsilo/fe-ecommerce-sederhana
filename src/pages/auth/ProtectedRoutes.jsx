import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, authToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [user, authToken]);

  if (authToken && user.role == 1) {
    return <Outlet />;
  } else if (authToken && user.role == 2) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <p>...Loading</p>
    </div>
  );
};

export default ProtectedRoutes;
