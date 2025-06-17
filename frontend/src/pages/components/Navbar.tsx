import { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, Menu, Truck, Headphones, Laptop, Heart } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const reduxToken = useAppSelector((store) => store.auth.user.token);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    const loggedIn = !!reduxToken || !!localToken;
    setIsLogin(loggedIn);
  }, [reduxToken]);

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
            <a href="/track-order" className="hover:text-gray-900 transition-colors">
              Track Order
            </a>
            <a href="/support" className="hover:text-gray-900 transition-colors">
              Support
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3" aria-label="TechHub Home">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Laptop className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechHub
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8" role="navigation">
              <a href="/laptops" className="text-sm font-medium hover:text-blue-600 transition-colors" aria-label="All Laptops category">
                All Laptops
              </a>
              <a href="/gaming" className="text-sm font-medium hover:text-blue-600 transition-colors" aria-label="Gaming category">
                Gaming
              </a>
              <a href="/business" className="text-sm font-medium hover:text-blue-600 transition-colors" aria-label="Business category">
                Business
              </a>
              <a href="/ultrabooks" className="text-sm font-medium hover:text-blue-600 transition-colors" aria-label="Ultrabooks category">
                Ultrabooks
              </a>
              <a href="/deals" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors" aria-label="Hot Deals">
                🔥 Hot Deals
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 w-80 border"
            >
              <Search className="h-4 w-4 text-gray-500" aria-hidden="true" />
              <label htmlFor="search-input" className="sr-only">
                Search for laptops, brands
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search for laptops, brands..."
                className="border-0 bg-transparent focus:outline-none placeholder:text-gray-400 text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <button
              className="p-2 hover:bg-gray-100 rounded-xl"
              aria-label="User account"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* 👇 Login/Logout button */}
            {isLogin ? (
              <button
                className="text-sm text-red-600 hover:text-red-800 font-medium"
                onClick={() => {
                  localStorage.removeItem('tokenauth');
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

            <button
              className="relative p-2 hover:bg-gray-100 rounded-xl"
              aria-label="Wishlist with 2 items"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-xs bg-red-500 text-white">
                2
              </span>
            </button>

            <button
              className="relative p-2 hover:bg-gray-100 rounded-xl"
              aria-label="Shopping cart with 3 items"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs bg-blue-600 text-white">
                3
              </span>
            </button>

            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col gap-4 p-4" role="navigation">
            <a
              href="/laptops"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              aria-label="All Laptops category"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Laptops
            </a>
            <a
              href="/gaming"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              aria-label="Gaming category"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gaming
            </a>
            <a
              href="/business"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              aria-label="Business category"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Business
            </a>
            <a
              href="/ultrabooks"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              aria-label="Ultrabooks category"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ultrabooks
            </a>
            <a
              href="/deals"
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              aria-label="Hot Deals"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🔥 Hot Deals
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
