import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import Register from "./pages/user/register";
import Login from "./pages/user/login";
import ForgotPassword from "./pages/user/forgot-password";
import ResetPassword from "./pages/user/reset-password";
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
