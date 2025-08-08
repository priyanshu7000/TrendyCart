import "./App.css";
//seeting up the routes
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";


//import {CartProvider} from './context/CartContext';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <CartProvider>
        <Navbar />

        {/* Setting up the routes */}

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
        {/* Wrapping the CartProvider around the components that need access to the cart context */}
      </CartProvider>
    </>
  );
}

export default App;
