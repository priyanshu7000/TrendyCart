import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/products" className="text-purple-600 underline">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-md"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              {/* ✅ Using addToCart instead of separate increaseQuantity */}
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-4 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 flex justify-between items-center p-4 border-t">
        <h3 className="text-xl font-bold">Total:</h3>
        <p className="text-2xl font-bold text-purple-600">
          ₹{getTotalPrice().toFixed(2)}
        </p>
      </div>

      {/* Checkout Button */}
      <div className="text-right mt-6">
        <Link
          to="/checkout"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
