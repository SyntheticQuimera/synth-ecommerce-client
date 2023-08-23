import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { IoCart, IoChevronBack, IoChevronForward } from "react-icons/io5";

export const Carousel = ({ products }) => {
  /*<=================== Cart Context ===================> */
  const addToCart = useCartStore((state) => state.addToCart);

  /*<=================== Carousel functionality ===================> */
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products?.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products?.length
    );
  };

  const animationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className='carousel relative w-full h-fit py-12'>
      {products?.map((product, index) => (
        <motion.div
          key={index}
          initial='hidden'
          animate={currentIndex === index ? "visible" : "hidden"}
          variants={animationVariants}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
          className={`carousel-item w-full ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <div className='hero'>
            <div className='hero-content flex-col lg:flex-row-reverse md:px-24'>
              <div className='aspect-square md:w-[28rem] md:min-w-[28rem] md:max-w-[28rem] w-[20rem] min-w-[20rem] max-w-[20rem] '>
                <img
                  src={product.images[0]}
                  className='w-full h-full object-contain'
                />
              </div>
              <div className='space-y-6'>
                <h1 className='text-2xl md:text-5xl font-bold'>
                  {product.title}
                </h1>
                <p>
                  {product.description && product.description.length > 220
                    ? product.description.slice(0, 220).concat("...")
                    : product.description}
                </p>
                <div className='flex flex-col md:flex-row gap-4'>
                  <Link
                    href={"/product/" + product._id}
                    className='btn btn-secondary btn-outline w-full md:w-fit'
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className='btn btn-primary w-full md:w-fit'
                  >
                    <IoCart size={22} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <div className='absolute flex justify-between transform -translate-y-1/2 left-3 right-3 md:left-5 md:right-5 bottom-2/3 md:top-1/2'>
        <button className='btn btn-ghost btn-circle'>
          <IoChevronBack onClick={prevSlide} size={24} />
        </button>
        <button className='btn btn-ghost btn-circle'>
          <IoChevronForward onClick={nextSlide} size={24} />
        </button>
      </div>
    </div>
  );
};
