import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 text-2xl font-bold text-purple-600">
            <Link to="/">TrendyCart</Link>
          </div>

          {/*Desktop Links*/}
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600">
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-purple-600"
            >
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-purple-600">
              Cart
            </Link>
            <Link
              to="/checkout"
              className="text-gray-700 hover:text-purple-600"
            >
              Checkout
            </Link>
          </div>

          {/* Cart Icon with Item Count */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
          {/*Hamburger Button*/}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12" //x icon when open
                      : "M4 6h16M4 12h16M4 18h16"
                  } // Hamburger icon
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600 py-2">
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-purple-600 py-2"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-purple-600 py-2"
            >
              Cart
            </Link>
            <Link
              to="/checkout"
              className="text-gray-700 hover:text-purple-600 py-2"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
