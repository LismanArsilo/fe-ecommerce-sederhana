import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/defaultLayout/UserLayout";
import ProtectedRoutes from "./pages/auth/ProtectedRoutes";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CategoryPage from "./pages/dashboard/CategoryPage";
import ProductPage from "./pages/dashboard/ProductPage";
import CategoryCreatePage from "./pages/dashboard/CategoryCreatePage";
import ProductCreatePage from "./pages/dashboard/ProductCreatePage";
import ColorPage from "./pages/dashboard/ColorPage";
import ColorCreatePage from "./pages/dashboard/ColorCreatePage";
import SizePage from "./pages/dashboard/SizePage";
import SizeCreatePage from "./pages/dashboard/SizeCreatePage";
import HomePage from "./pages/user/HomePage";
import HomeProductPage from "./pages/user/HomeProductPage";
import HomeAboutPage from "./pages/user/HomeAboutPage";
import HomeProductOrderPage from "./pages/user/HomeProductOrderPage";
import ProtectedUser from "./pages/auth/ProtectedUser";

function App() {
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={authToken ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={authToken ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<HomeProductPage />} />
        <Route path="/about" element={<HomeAboutPage />} />
        <Route element={<ProtectedUser />}>
          <Route path="/product/order" element={<HomeProductOrderPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/category" element={<CategoryPage />}></Route>
          <Route
            path="/dashboard/category/create"
            element={<CategoryCreatePage />}
          />
          <Route path="/dashboard/product" element={<ProductPage />} />
          <Route
            path="/dashboard/product/create"
            element={<ProductCreatePage />}
          />
          <Route path="/dashboard/color" element={<ColorPage />} />
          <Route path="/dashboard/color/create" element={<ColorCreatePage />} />
          <Route path="/dashboard/size" element={<SizePage />} />
          <Route path="/dashboard/size/create" element={<SizeCreatePage />} />
        </Route>

        {/* Handle Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
