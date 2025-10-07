import ProductDetail from "@/components/productDetail";
import { stripe } from "@/lib/stripe";
import React from "react";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const resolvedParams = await params;

  const product = await stripe.products.retrieve(resolvedParams.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;
