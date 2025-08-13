// Temporary hardcoded data (replace with real products later)
const featuredProducts = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    price: 2999,
    image: "/images/jacket.jpg",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 1499,
    image: "/images/headphones.jpg",
  },
  { id: 3, name: "Smart Watch", price: 2499, image: "/images/watch.jpg" },
  {
    id: 4,
    name: "Stylish Sneakers",
    price: 1999,
    image: "/images/sneakers.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-purple-600 font-bold">₹{product.price}</p>
              <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
