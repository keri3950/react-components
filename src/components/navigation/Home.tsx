import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "./types";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => setTrendingProducts(res.products.slice(0, 6)));
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Trending Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md"
          >
            <Link
              to={`/products/${product.id}`}
              className="block  !no-underline hover:!no-underline"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {product.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/products"
        className="w-full text-center !text-black bg-gray-200 mt-8 inline-block font-bold py-2 px-4 rounded hover:cursor-pointer !no-underline hover:!no-underline hover:bg-gray-300 transition-colors"
      >
        View All Products
      </Link>
    </>
  );
}
