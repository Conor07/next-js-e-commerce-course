import ProductList from "@/components/productList";
import { stripe } from "@/lib/stripe";
import React from "react";

const Products = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div>
      <h1>All Products</h1>

      {products?.data && <ProductList products={products.data} />}
    </div>
  );
};

export default Products;
