import { useState, type ReactElement, useEffect, useMemo } from "react";

type Products = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type CardProps = {
  image: string;
  title: string;
};

const PAGE_SIZE = 10;

function Card({ image, title }: CardProps): ReactElement {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
}

export default function Pagination(): ReactElement {
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=500");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const pages: number[] = useMemo(() => {
    const pageWindow = [currentPage - 1, currentPage, currentPage + 1];
    return pageWindow.filter((p) => p >= 0 && p < totalPages);
  }, [currentPage, totalPages]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  if (products.length > 0) {
    return (
      <>
        <div className="flex gap-2 justify-center my-8 items-center">
          <button
            onClick={() => handlePageClick(0)}
            disabled={currentPage === 0}
            className="flex item-center px-4 py-2 rounded shadow-sm bg-white disabled:opacity-50 cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <span className="material-symbols-outlined">
              keyboard_double_arrow_left
            </span>
          </button>

          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded shadow-sm bg-white disabled:opacity-50 cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Prev
          </button>

          {pages.map((page, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded shadow-sm disabled:opacity-50 hover:cursor-pointer ${
                page === currentPage
                  ? "bg-cyan-500"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded shadow-sm bg-white disabled:opacity-50 cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Next
          </button>
          <button
            onClick={() => handlePageClick(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
            className="flex item-center px-4 py-2 rounded shadow-sm bg-white disabled:opacity-50 cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <span className="material-symbols-outlined">
              keyboard_double_arrow_right
            </span>
          </button>
        </div>
        <div className="flex flex-wrap">
          {products.slice(startIndex, endIndex).map((product) => (
            <Card
              key={product.id}
              image={product.thumbnail}
              title={product.title}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen italic text-gray-400">
      No Products Found
    </div>
  );
}
