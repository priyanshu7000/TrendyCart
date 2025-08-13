import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import SigninPhone from "./pages/SigninPhone";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <CartProvider>
      <Navbar />

      {/* Setting up the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected checkout route */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Categories */}
        <Route path="/category/clothing" element={<CategoryPage />} />
        <Route path="/category/electronics" element={<CategoryPage />} />
        <Route path="/category/home" element={<CategoryPage />} />
        <Route path="/category/accessories" element={<CategoryPage />} />

        {/* Product details */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Sign in */}
        <Route path="/signin" element={<SigninPhone />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
