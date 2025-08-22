import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Map frontend categories → FakeStore API categories
  const categoryMap: Record<string, string | string[]> = {
    electronics: "electronics",
    clothing: ["men's clothing", "women's clothing"], // merge both
    accessories: "jewelery",
    home: "electronics", // ⚠️ API has no "home", we can map to electronics for now
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiCategory = category
          ? categoryMap[category.toLowerCase()]
          : null;

        if (!apiCategory) {
          setError("Invalid Category");
          setProducts([]);
          return;
        }

        const res = await fetch(
          `https://fakestoreapi.com/products/category/${apiCategory}`
          //`https://dummyjson.com/products/categories/${apiCategory}`
        );
        const data = await res.json();

        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    console.log("Category from URL:", category);
  }, [category]);

  {
    /**
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const apiCategory = categoryMap[category?.toLowerCase() || ""] || "";
        if (!apiCategory) {
          setError("Invalid category");
          setProducts([]);
          return;
        }

        const res = await fetch(
          `https://fakestoreapi.com/products/category/${apiCategory}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, categoryMap]);
   */
  }

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 shadow animate-pulse">
      <div className="bg-gray-300 h-40 w-full rounded-md"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="mt-4 h-10 bg-gray-300 rounded"></div>
    </div>
  );

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

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center capitalize">
        {category} Products
      </h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              onAddToCart={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
