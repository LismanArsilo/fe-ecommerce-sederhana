import React, { useEffect, useState } from "react";
import RegisterImage from "../../assets/imageRegister.png";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../storeReduxToolkit/thunksRedux/authThunk";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formRegister, setFormRegister] = useState(initialState);
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(authRegister(formRegister)).unwrap();
      showSuccessAlert(response.message);
    } catch (error) {
      showErrorAlert(error);
    }
  };

  return (
    <div className="h-[100vh] w-12/12 flex items-center justify-center">
      <div className="w-6/12">
        <h1 className="text-2xl font-bold text-center mb-3">Register Now</h1>
        <div className="flex items-center justify-center px-3 gap-3">
          <img
            src={RegisterImage}
            className="flex-1 w-2/6 hidden lg:inline"
            alt=""
          />
          <form className="w-full flex-1 py-5">
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="name"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="name"
                type="text"
                placeholder="Username"
                autoComplete="off"
                name="name"
                value={formRegister.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="email"
                type="email"
                placeholder="email"
                autoComplete="off"
                name="email"
                value={formRegister.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formRegister.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-sm ${
                  formRegister.password !== formRegister.confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formRegister.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                className={`py-1 rounded-lg bg-blue-900 text-white font-bold px-10 mr-2 w-full hover:bg-blue-950 ${
                  formRegister.password !== formRegister.confirmPassword
                    ? "pointer-events-none cursor-not-allowed"
                    : "pointer-events-auto"
                }`}
                onClick={handleSubmit}
              >
                {isLoading ? `Loading. . .` : `Register`}
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <h3>
            If You Have On Account, Please
            <Link to="/login" className="text-blue-700 font-bold ms-2">
              Login
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
