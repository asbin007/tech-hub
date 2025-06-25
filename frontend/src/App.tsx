import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";

// User Auth Pages
import Register from "./pages/user/register";
import Login from "./pages/user/login";
import ForgotPassword from "./pages/user/forgot-password";
import ResetPassword from "./pages/user/reset-password";

// Product Pages
import ProductDetail from "./pages/products/ProductDetaills";
import ProductFilters from "./pages/products/ProductFilter";
import MyCart from "./pages/cart/MyCart";
import Checkout from "./pages/checkout/checkout";

import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { loadUserFromStorage } from "./store/authSlice";
import MyOrdersPage from "./pages/order/OrderPage";
import OrderDetailsPage from "./pages/order/OrderDetaills";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Product Routes */}
          <Route path="/:categoryName/:brand/:id" element={<ProductDetail />} />
          <Route path="/:categoryName/:brand" element={<ProductFilters />} />
          <Route path="/all-laptops" element={<ProductFilters />} />
          <Route path="/:categoryName" element={<ProductFilters />} />

          {/* Cart and Checkout */}
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-checkout" element={<Checkout />} />

          {/* my-order */}
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-orders/:id" element={<OrderDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
