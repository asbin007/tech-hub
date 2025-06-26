import { useEffect, useState } from "react";
import { Search, Menu, Truck, Headphones, Laptop } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartItems } from "../../store/cartSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { data: cartItems } = useAppSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const loggedIn = !!reduxToken || !!localToken;
    setIsLogin(loggedIn);

    // Fetch cart items if user is logged in
    if (loggedIn) {
      dispatch(fetchCartItems());
    }
  }, [reduxToken, dispatch]);

  const handleCartClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      toast.error("Please log in to view your cart", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "#ffffff",
          padding: "12px 16px",
          borderRadius: "8px",
        },
      });
    } else if (cartItems.length === 0) {
      e.preventDefault();
      toast.error("Your cart is empty. Add items to proceed.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#f97316", // orange
          color: "#ffffff",
          padding: "12px 16px",
          borderRadius: "8px",
        },
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setIsMobileMenuOpen(false);
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-sm text-gray-500 border-b">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link
              to="/track-order"
              className="hover:text-gray-900 transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/support"
              className="hover:text-gray-900 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 sm:gap-8 flex-1">
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label="TechHub Home"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Laptop className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechHub
              </span>
            </Link>

            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8"
              role="navigation"
            >
              <Link
                to="/all-laptops"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                All Laptops
              </Link>
              <Link
                to="/gaming-laptops"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Gaming
              </Link>
              <Link
                to="/business-laptops"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Business
              </Link>
              <Link
                to="/ultrabooks"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Ultrabooks
              </Link>
              <Link
                to="/deals"
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                🔥 Hot Deals
              </Link>
              <Link
                to="/my-orders"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                My Orders
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(
                    `/search?query=${encodeURIComponent(searchQuery.trim())}`
                  );
                  setSearchQuery(""); // optional: clear input after search
                }
              }}
              className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-3 sm:px-4 py-2 w-48 sm:w-64 lg:w-80 border"
            >
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search for laptops, brands..."
                className="border-0 bg-transparent focus:outline-none placeholder:text-gray-400 text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {isLogin ? (
              <button
                className="text-sm text-red-600 hover:text-red-800 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Login
              </Link>
            )}

            <div className="relative">
              <Link to="/my-cart" onClick={handleCartClick}>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
              </Link>

              {isLogin && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>

            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <nav className="flex flex-col gap-4 p-4">
            <Link to="/all-laptops" onClick={() => setIsMobileMenuOpen(false)}>
              All Laptops
            </Link>
            <Link
              to="/gaming-laptops"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gaming
            </Link>
            <Link
              to="/business-laptops"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Business
            </Link>
            <Link to="/ultrabooks" onClick={() => setIsMobileMenuOpen(false)}>
              Ultrabooks
            </Link>
            <Link
              to="/deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-red-600"
            >
              🔥 Hot Deals
            </Link>
            <Link to="/my-orders" onClick={() => setIsMobileMenuOpen(false)}>
              My Orders
            </Link>

            <div className="pt-2">
              {isLogin ? (
                <button
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
