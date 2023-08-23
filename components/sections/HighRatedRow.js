import React from "react";
import { useDragging } from "@/hooks/useDragging";
import { CardProduct, Title } from "../common";

export const HighRatedRow = ({ products, wishedProducts }) => {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragging();

  return (
    <section className='w-section p-section'>
      <Title title='High Rated' />
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className='grid cursor-grab select-none grid-flow-col grid-rows-2 
        place-content-start gap-4 overflow-x-scroll scrollbar-none'
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
                size='sm'
                wished={wishedProducts.includes(product._id)}
              />
            </div>
          ))}
      </div>
    </section>
  );
};
