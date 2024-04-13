import React, { useState } from "react";
import LoginImage from "../../assets/imageLogin.png";
import { authLogin } from "../../storeReduxToolkit/thunksRedux/authThunk";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, authToken } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    email: "",
    password: "",
  };

  const [formLogin, setFormLogin] = useState(initialState);

  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(authLogin(formLogin)).unwrap();
      showSuccessAlert(response.message);
    } catch (error) {
      showErrorAlert(error);
    }
  };

  return (
    <div>
      <div className="h-[100vh] w-12/12 flex items-center justify-center">
        <div className="w-6/12">
          <h1 className="text-2xl font-bold text-center mb-3">Login Now</h1>
          <div className="flex items-center justify-center px-3 gap-3">
            <img
              src={LoginImage}
              className="flex-1 w-2/6 hidden lg:inline"
              alt=""
            />
            <form className="w-full flex-1 py-5">
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
                  value={formLogin.email}
                  onChange={handleChange}
                  autoFocus
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
                  value={formLogin.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  className={`py-1 rounded-lg bg-blue-900 text-white font-bold px-10 mr-2 w-full hover:bg-blue-950 `}
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="text-center">
            <h3>
              You Don't Have Account ? Please Go To
              <Link to="/register" className="text-blue-700 font-bold ms-2">
                Register
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
