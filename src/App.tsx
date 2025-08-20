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
//import SigninPhone from "./pages/SigninPhone";
import ProtectedRoute from "./components/PrivateRoute";
//import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/clothing" element={<CategoryPage />} />
        <Route path="/category/electronics" element={<CategoryPage />} />
        <Route path="/category/home" element={<CategoryPage />} />
        <Route path="/category/accessories" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Auth pages */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        {/**<Route path="/login" element={<Login />} /> */}

        {/*** <Route path="/signin" element={<SigninPhone />} /> */}

        {/* Protected pages */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
