import Link from "next/link";
import React from "react";
import { TbShoppingBag } from "react-icons/tb";

export const Featured = ({ products }) => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <img src='' alt='featured' className='max-w-sm rounded-lg shadow-2xl' />
        <div>
          <h1 className='text-5xl font-bold'>Box Office News!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className='btn btn-primary'>Get Started</button>
        </div>
      </div>
    </div>
  );
};
{
  /* </div>
    <div className='pt-40 pb-6 flex flex-col-reverse md:flex-row gap-4 min-h-screen px-4 md:px-20'>
      <div className='flex flex-1 justify-center flex-col text-center md:text-start gap-4'>
        <h1 className='text-4xl lg:text-5xl font-semibold lg:leading-tight leading-tight '>
          {products.title.length > 18
            ? `${products.title.slice(0, 18)}`
            : products.title}
        </h1>
        <p>
          {products.description.length > 220
            ? `${products.description.slice(0, 220)}...`
            : products.description}
        </p>
        <div className='flex w-full flex-col lg:flex-row gap-4'>
          <Link href={"/products/" + products._id} className='w-full'>
            <Button variant='outlined' size='md' fullWidth>
              View Details
            </Button>
          </Link>
          <Button
            onClick={() => console.log("click!")}
            variant='primary'
            size='md'
            fullWidth>
            <TbShoppingBag size={22} />
            Add to cart
          </Button>
        </div>
      </div>
      <div className='flex flex-1 md:p-20 items-center justify-center'>
        <img
          src={products.images[0]}
          alt='featured'
          className='mix-blend-darken'
        />
      </div>
    </div> */
}
