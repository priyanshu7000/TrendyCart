import ProductCard from "../components/ProductCard";
import {useEffect, useState} from "react";



/* this is the dummy products what we used back then*/ 
const dummyProducts = [
  {
    id: 1,
    name: "T-Shirt",
    image: "https://via.placeholder.com/150",
    price: 499,
  },
  {
    id: 2,
    name: "Sneakers",
    image: "https://via.placeholder.com/150",
    price: 1299,
  },
  {
    id: 3,
    name: "Jeans",
    image: "https://via.placeholder.com/150",
    price: 899,
  },
  {
    id: 4,
    name: "Watch",
    image: "https://via.placeholder.com/150",
    price: 1999,
  },
  {
    id: 5,
    name: "Backpack",
    image: "https://via.placeholder.com/150",
    price: 1499,
  },
];



type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const Products = () => {

  const [products, setProducts] = useState<Product[]>([]);
  //Using useState<Product[]>([]) ensures TypeScript knows the structure of each item in the array.
  const [loading, setLoading] = useState<boolean>(true);
  //loading state to show a loading spinner while fetching products


//use useEffect to fetch products from an API 
useEffect(()=>{
  const fetchProducts =  async () =>{
    try {
      const res= await fetch('https://fakestoreapi.com/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
    }catch(error){
      console.error("Failed to fetch products:", error)
    }
  };
  fetchProducts();
}, []);


  const handleAddToCart = (id: number) => {
    console.log(`Product with id ${id} added to cart`);
    // Here you can implement the logic to add the product to the cart
    //Later, update cart state here
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            image={product.image}
            price={product.price}
            onAddToCart = {handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;


// full flow
// [Component Mounts] → [useEffect triggers] → [Fetch products from API] → [Save to state] → [Render UI] → [Display Product Cards]
