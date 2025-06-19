import { useEffect, useState } from 'react';
import { Search, ShoppingCart, Menu, Truck, Headphones, Laptop, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../../store/cartSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { data } = useAppSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    const loggedIn = !!reduxToken || !!localToken;
    setIsLogin(loggedIn);
  }, [reduxToken]);

  const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLogin && data.length > 0) {
      dispatch(fetchCartItems());
    } else {
      e.preventDefault();
      toast.error('No items in the cart', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#dc2626',
          color: '#ffffff',
          padding: '12px 16px',
          borderRadius: '8px',
        },
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    setIsMobileMenuOpen(false);
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-500 border-b">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/track-order" className="hover:text-gray-900 transition-colors">
              Track Order
            </Link>
            <Link to="/support" className="hover:text-gray-900 transition-colors">
              Support
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3" aria-label="TechHub Home">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Laptop className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechHub
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8" role="navigation">
              <Link to="/all-laptops" className="text-sm font-medium hover:text-blue-600 transition-colors">
                All Laptops
              </Link>
              <Link to="/gaming-laptops" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Gaming
              </Link>
              <Link to="/business-laptops" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Business
              </Link>
              <Link to="/ultrabooks" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Ultrabooks
              </Link>
              <Link to="/deals" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                🔥 Hot Deals
              </Link>
              <Link to="/my-orders" className="text-sm font-medium hover:text-blue-600 transition-colors">
                My Orders
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 w-80 border"
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
              <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Login
              </Link>
            )}

            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-xs bg-red-500 text-white">
                2
              </span>
            </Link>

            <Link
              to="/my-cart"
              onClick={handleCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-xl"
            >
              <ShoppingCart className="h-5 w-5" />
              {isLogin && data.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs bg-blue-600 text-white">
                  {data.length}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col gap-4 p-4">
            <Link to="/all" onClick={() => setIsMobileMenuOpen(false)}>
              All Laptops
            </Link>
            <Link to="/gaming-laptops" onClick={() => setIsMobileMenuOpen(false)}>
              Gaming
            </Link>
            <Link to="/business-laptops" onClick={() => setIsMobileMenuOpen(false)}>
              Business
            </Link>
            <Link to="/ultrabooks" onClick={() => setIsMobileMenuOpen(false)}>
              Ultrabooks
            </Link>
            <Link to="/deals" onClick={() => setIsMobileMenuOpen(false)} className="text-red-600">
              🔥 Hot Deals
            </Link>
            <Link to="/my-orders" onClick={() => setIsMobileMenuOpen(false)}>
              My Orders
            </Link>

            <div className="pt-2">
              {isLogin ? (
                <button
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login
                </a>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
