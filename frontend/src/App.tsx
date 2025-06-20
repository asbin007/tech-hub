import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import store from "./store/store";

// User Auth Pages
import Register from "./pages/user/register";
import Login from "./pages/user/login";
import ForgotPassword from "./pages/user/forgot-password";
import ResetPassword from "./pages/user/reset-password";

// Product Pages
import ProductDetail from "./pages/products/ProductDetaills";
import ProductFilters from "./pages/products/ProductFilter";
import MyCart from "./pages/cart/MyCart";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Product Routes */}
            <Route
              path="/:categoryName/:brand/:id"
              element={<ProductDetail />}
            />
            <Route path="/:categoryName/:brand" element={<ProductFilters />} />
            <Route path="/all-laptops" element={<ProductFilters />} />

            <Route path="/:categoryName" element={<ProductFilters />} />

            <Route path="/my-cart" element={<MyCart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
