import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <nav className=" sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm pt-4 pl-4 pr-4">
      <div className="w-full">
        <div className="w-full flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-primary">
            <Link to="/">TrendyCart</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-secondary font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              to="/checkout"
              className="hover:text-primary transition-colors"
            >
              Checkout
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <div className="relative group cursor-pointer">
              <span className="text-2xl">👤</span>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 flex flex-col space-y-4 pb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              to="/checkout"
              className="hover:text-primary transition-colors"
            >
              Checkout
            </Link>
            <Link to="/cart" className="hover:text-primary transition-colors">
              Cart
            </Link>
            <Link
              to="/profile"
              className="hover:text-primary transition-colors"
            >
              Profile
            </Link>
            <Link to="/login" className="hover:text-primary transition-colors">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
