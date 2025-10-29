import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import BreadCrumbs from "./BreadCrumbs";

export default function Navigation() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans ">
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <BreadCrumbs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
