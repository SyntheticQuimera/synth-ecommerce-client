import React from "react";
import { Carousel, ProductsBanner } from "../common";

export const Featured = ({ products }) => {
  return (
    <section className='w-section h-section'>
      {/*<=================== Carousel ===================> */}
      <Carousel products={products} />
      {/*<=================== Banner ===================> */}
      <ProductsBanner />
    </section>
  );
};
