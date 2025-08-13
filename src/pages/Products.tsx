import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

// ...existing code...

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // ...existing code...

  //this is to handle loading states
  const [loading, setLoading] = useState(true);
  //this is to handle errors
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      // Map API product fields to CartContext Product type
      addToCart({
        id: product.id,
        title: product.title || "",
        image: product.image,
        price: product.price,
        quantity: 1,
      });
    }
  };

  //skeleton loader component
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 shadow animate-pulse">
      <div className="bg-gray-300 h-40 w-full rounded-md"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="mt-4 h-10 bg-gray-300 rounded"></div>
    </div>
  );

  //Show loading state as a skeleton loader
  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  //Show error state
  //Show loading state
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title || ""}
            image={product.image}
            price={product.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;

// full flow
// [Component Mounts] → [useEffect triggers] → [Fetch products from API] → [Save to state] → [Render UI] → [Display Product Cards]
