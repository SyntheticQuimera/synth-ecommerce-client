import React from "react";
import { useDragging } from "@/hooks/useDragging";
import { CardProduct, Title } from "../common";

export const NewArrivalsRow = ({ products, wishedProducts }) => {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragging();
  return (
    <section className='w-section p-section'>
      <Title title='New Arrivals' />
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className='rounded-box flex cursor-grab select-none gap-4 overflow-x-scroll scrollbar-none'
      >
        {products?.length > 0 &&
          products?.map((product) => (
            <div className='carousel-item'>
              <CardProduct
                key={product._id}
                _id={product._id}
                product={product}
                title={product.title}
                images={product.images[0]}
                price={product.price}
                size='md'
                wished={wishedProducts.includes(product._id)}
              />
            </div>
          ))}
      </div>
    </section>
  );
};
