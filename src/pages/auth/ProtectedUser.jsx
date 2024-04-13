import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ProtectedUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  const { user, authToken } = useSelector((state) => state.auth);

  const handleValidityToken = async () => {
    try {
      const responValidityToken = await axiosAuth.get(
        config.apiUrl + "/auth/check-token"
      );

      if (authToken && user.role === 1 && responValidityToken.data.status) {
        setIsValidToken(true);
      } else if (
        authToken &&
        user.role === 2 &&
        responValidityToken.data.status
      ) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    handleValidityToken();
  }, []);

  return (
    <div>
      {isValidToken ? (
        user.role === 1 ? (
          <Navigate to="/dashboard" />
        ) : (
          <Outlet />
        )
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 30,
                }}
                spin
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProtectedUser;
