import { Layout } from "@/components/common";
import fetchData from "@/lib/fetchData";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useCartStore } from "@/store/useCartStore";
import React, { useState } from "react";
import {
  IoCart,
  IoChevronDown,
  IoChevronUp,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";

export default function ProductPage({ product, categories, subcategories }) {
  const [selectIndex, setSelectIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addToFav, setAddToFav] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = showFullDescription
    ? product.description
    : product.description.slice(0, 320).concat("...");

  const shouldShowButton = product.description.length > 320;

  return (
    <Layout categories={categories} subcategories={subcategories}>
      <section className='mx-auto max-w-7xl py-6'>
        <div className='grid px-2 sm:px-6 md:grid-cols-4 gap-6'>
          <div className='md:col-span-2 grid grid-cols-6 gap-4'>
            <div className='flex flex-col gap-2 col-span-1'>
              {product?.images?.map((image, index) => (
                <img
                  onMouseEnter={() => setSelectIndex(index)}
                  key={index}
                  src={image}
                  alt=''
                  className='h-12 w-12 object-contain border rounded-md cursor-pointer'
                />
              ))}
            </div>
            <img
              src={product.images[selectIndex]}
              alt=''
              className='col-span-5 w-full object-contain border rounded-box aspect-square'
            />
          </div>
          <div className='md:col-span-2 px-4 sm:px-0 space-y-4'>
            <div className='rating rating-md'>
              <input
                type='radio'
                name='rating-2'
                className='mask mask-star-2 bg-warning'
              />
              <input
                type='radio'
                name='rating-2'
                className='mask mask-star-2 bg-warning'
              />
              <input
                type='radio'
                name='rating-2'
                className='mask mask-star-2 bg-warning'
              />
              <input
                type='radio'
                name='rating-2'
                className='mask mask-star-2 bg-warning'
              />
              <input
                type='radio'
                name='rating-2'
                className='mask mask-star-2 bg-warning'
              />
            </div>
            <article className='space-y-6'>
              <h1 className='text-3xl font-semibold'>{product.title}</h1>
              <h2 className='text-3xl font-semibold text-primary'>
                $ {product.price}
              </h2>
              <p>{description}</p>
              {shouldShowButton && (
                <button
                  className='text-primary uppercase flex items-center'
                  onClick={toggleDescription}
                >
                  {showFullDescription
                    ? ["View less", <IoChevronUp className='ml-2' size={16} />]
                    : [
                        "View more",
                        <IoChevronDown className='ml-2' size={16} />,
                      ]}
                </button>
              )}
              <div className='flex gap-2 w-full justify-center lg:justify-start'>
                <button
                  onClick={() => setAddToFav(!addToFav)}
                  className='btn btn-secondary'
                >
                  {!addToFav ? (
                    <IoHeartOutline size={22} />
                  ) : (
                    <IoHeart className='text-accent' size={22} />
                  )}
                  Add to wishlist
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className='btn btn-primary'
                >
                  <IoCart size={22} /> Add to cart
                </button>
              </div>
              <div className='divider'></div>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>Information:</h3>
                {product.properties &&
                  Object.entries(product?.properties).map(([key, value]) => (
                    <div key={key} className='flex gap-1'>
                      <p className='font-semibold'>{key}:</p>
                      <p>{value}</p>
                    </div>
                  ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const data = await fetchData(context);
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: data.categories,
      subcategories: data.subcategories,
    },
  };
}
