import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { BreadCrum } from "../Component/BreadCrums/BreadCrum";
import { ProductDisplay } from "../Component/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../Component/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../Component/RelatedProducts/RelatedProducts";

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};
