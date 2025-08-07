import { useEffect, useState } from "react";
import banner from "../assets/Gemini_Generated_Image_g20lug20lug20lug.png";
import home from "../assets/categories/Home.png";
import electonics from "../assets/categories/Electronics.png";
import clothing from "../assets/categories/Clothing.png";
import accessories from "../assets/categories/accessrios.png";

const quotes = [
  "Discover the Latest Trends",
  "Your Style, Delivered",
  "Shop Smarter. Live Better.",
  "Fashion Meets Function",
  "One Cart. Endless Style.",
];

const Home = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote((prev) => {
        const index = quotes.indexOf(prev);
        return quotes[(index + 1) % quotes.length];
      });
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once on mount

  const categories = [
    {
      name: "Clothing",
      image: clothing,
    },
    {
      name: "Electronics",
      image: electonics,
    },
    {
      name: "Home",
      image: home,
    },
    {
      name: "Accessories",
      image: accessories,
    },
  ];

  return (
    <div className="px-4 md:px-10 py-6">
      {/* Hero Section with Background Image */}
      <section
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Heading at Top */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to TrendyCart 🛍️
          </h1>
        </div>

        {/* Quote at Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center px-4">
          <p className="text-lg md:text-2xl">{quote}</p>
        </div>

        {/* Button at Bottom */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <a
            href="/products"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Categories with Images */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-purple-700">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mt-16 bg-purple-100 p-6 text-center rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-purple-700">
          Sign up & get 10% off your first order!
        </h3>
        <a
          href="/signup"
          className="inline-block mt-2 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
        >
          Join Now
        </a>
      </section>
    </div>
  );
};

export default Home;
