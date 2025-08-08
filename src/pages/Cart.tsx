import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/Products" className="text-purple-600 underline">
          Go to Products{" "}
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Your Cart</h2>
      <div className="space-y-4 ">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/*disable the button if quantity is 1*/}
              <button
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity === 1}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                -
              </button>

              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-lg font-semibold">
        Total: ₹{getTotalPrice().toFixed(2)}
      </div>

      <button
        onClick={() => {
          alert("Thank you for your purchase!");
          // Later: clear cart logic here
        }}
        className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </button>

      <div className="text-right mt-4">
        {/* Link to Checkout page */}
        <Link
          to="/checkout"
          className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
