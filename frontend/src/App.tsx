"use client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { loadUserFromStorage } from "./store/authSlice";

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
import MyOrdersPage from "./pages/order/OrderPage";
import OrderDetailsPage from "./pages/order/OrderDetaills";
import SearchResults from "./pages/products/SerarchResults";

// Initialize Socket.IO client
export const socket = io( "http://localhost:2000", {
  auth: {
    token: localStorage.getItem("token") || "", 
  },
  transports: ["websocket", "polling"], // Fallback to polling if WebSocket fails
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Limit reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnection attempts
});

// Log Socket.IO connection status
socket.on("connect", () => {
  console.log("Socket.IO connected successfully");
});

socket.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error.message);
});

socket.on("reconnect_attempt", (attempt) => {
  console.log(`Socket.IO reconnection attempt ${attempt}`);
});

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
          <Route path="/search" element={<SearchResults />} />

          {/* Cart and Checkout */}
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-checkout" element={<Checkout />} />

          {/* Order Routes */}
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-orders/:id" element={<OrderDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}