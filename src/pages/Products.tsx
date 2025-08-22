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
  const[loading, setLoading] = useState(true);
  //this is to handle errors
  const[error, setError] = useState<string | null>(null);

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
        console.error(error);
      }finally{
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
