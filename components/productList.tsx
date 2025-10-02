"use client";

import React from "react";
import Stripe from "stripe";
import ProductCard from "./productCard";

interface ProductListProps {
  products: Stripe.Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, idx) => {
            return (
              <li key={idx}>
                <ProductCard key={idx} product={product} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500 w-full my-8">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
