import { useCart } from "../context/CartContext";

/** This component accept product info as props, Display the image, name, price. Inckude an "Add to Cart" button */

type ProductProps = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const ProductCard = ({ id, name, image, price }: ProductProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = { id, name, image, price, quantity: 1 };
    addToCart(product);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 w-full sm:w-64 transition transform hover:-translate-y-1
"
    >
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-purple-600 font-bold text-md">₹{price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
