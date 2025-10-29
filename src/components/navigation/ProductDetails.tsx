import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "./types";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-2xl text-red-500">Product not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg shadow-md border border-gray-200"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h2>
          <p className="text-3xl font-semibold text-gray-700 mb-6">
            ${product.price}
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <Link
        to="/products"
        className="mt-8 inline-block bg-gray-200 !text-black !no-underline hover:!no-underline font-bold py-2 px-4 rounded hover:cursor-pointer"
      >
        &larr; Back to Products
      </Link>
    </>
  );
}
