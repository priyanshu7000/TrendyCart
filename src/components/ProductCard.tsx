import React, { useState, memo } from "react";
import { Link } from "react-router-dom";

type ProductProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  onAddToCart: (id: number) => void;
};

const PLACEHOLDER = "/images/placeholder.png";

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  onAddToCart,
}) => {
  const [src, setSrc] = useState(image);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article className="group bg-white shadow-md rounded-lg p-4 w-full sm:w-64 transition transform hover:-translate-y-1">
      <Link
        to={`/product/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary rounded"
      >
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setSrc(PLACEHOLDER)}
          className="h-48 w-full object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2 line-clamp-2">{title}</h3>
      </Link>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-purple-600 font-bold text-md">{formattedPrice}</p>
        <button
          type="button"
          aria-label={`Add ${title} to cart`}
          onClick={() => onAddToCart(id)}
          className="ml-auto bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Add
        </button>
      </div>
    </article>
  );
};

export default memo(ProductCard);
