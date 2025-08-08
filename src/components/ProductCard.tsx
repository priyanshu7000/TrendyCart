// ...existing code...

/** This component accept product info as props, Display the image, name, price. Inckude an "Add to Cart" button */

type ProductProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  onAddToCart: (id: number) => void;
};

const ProductCard = ({
  id,
  title,
  image,
  price,
  onAddToCart,
}: ProductProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-64 transition transform hover:-translate-y-1">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-purple-600 font-bold text-md">₹{price}</p>
      <button
        onClick={() => onAddToCart(id)}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
