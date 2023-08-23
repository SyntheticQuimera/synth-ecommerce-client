import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useCartStore } from "@/store/useCartStore";
import { IoCart, IoHeart, IoHeartOutline } from "react-icons/io5";
import axios from "axios";

export const CardProduct = ({
  title,
  images,
  price,
  product,
  size = "md",
  description,
  _id,
  wished = false,
  onRemoveFromWishlist = () => {},
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const url = `/product/${_id}`;

  const [isWished, setIsWished] = useState(wished);
  const addToWishlist = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const truncateDescription = (description) => {
    if (description && description.length > 420) {
      return description.slice(0, 420).concat("...");
    }
    return description;
  };

  const cardSizeClasses = classNames(
    "card",
    "card-compact",
    "overflow-hidden",
    {
      "w-72 h-[28rem]": size === "lg",
      "w-56 h-[24rem]": size === "md",
      "w-[22rem] h-40 flex-row": size === "sm",
      "w-full h-72 flex-row": size === "xl",
    },
    "bg-base-100 border select-none"
  );

  const figureSizeClasses = classNames({
    "w-28 min-w-[7rem]": size === "sm",
    "w-60 min-w-[15rem]": size === "xl",
  });

  const imageHeightClasses = classNames("object-contain", {
    "h-56": size === "lg",
    "h-44": size === "md",
    "h-36": size === "sm",
    "h-60": size === "xl",
  });

  const favoriteButtonClasses = classNames(
    "btn btn-circle btn-ghost absolute top-2 right-2",
    {
      hidden: size === "sm" || size === "xl",
    }
  );

  const descriptionClasses = classNames({
    hidden: size === "sm" || size === "md" || size === "lg",
  });

  const addToCartButtonClasses = classNames("btn btn-primary mt-auto ", {
    hidden: size === "sm" || size === "xl",
  });

  const buttonsContainerClasses = classNames({
    "flex flex-col p-2 justify-between": size === "sm" || size === "xl",
    hidden: !(size === "sm" || size === "xl"),
  });

  const favoriteButtonSizeClasses = classNames("btn btn-circle btn-ghost", {
    hidden: size === "lg" || size === "md",
    "btn-lg": size === "xl",
  });

  const cartButtonSizeClasses = classNames("btn btn-ghost btn-circle", {
    hidden: size === "lg" || size === "md",
    "btn-lg btn-ghost": size === "xl",
  });

  const heartIconSizeClasses = classNames({
    "!text-2xl": size === "sm",
    "!text-3xl": size === "xl",
  });

  const cartIconSizeClasses = classNames({
    "!text-2xl": size === "sm",
    "!text-3xl": size === "xl",
  });

  return (
    <div key={_id} className={cardSizeClasses}>
      <figure className={figureSizeClasses}>
        <img
          draggable={false}
          src={images}
          alt='product'
          className={imageHeightClasses}
        />
        <button onClick={addToWishlist} className={favoriteButtonClasses}>
          {!isWished ? (
            <IoHeartOutline size={28} className='invert' />
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <IoHeart size={28} className='text-accent' />
            </motion.div>
          )}
        </button>
      </figure>
      <div className='card-body'>
        <Link
          href={url}
          className={classNames("card-title truncate-text-2 hover:opacity-90", {
            "text-lg leading-5": size === "sm",
          })}
        >
          {title}
        </Link>
        <div className='rating rating-sm'>
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type='radio'
              name={`rating-${_id}`}
              className='mask mask-star-2 bg-warning'
            />
          ))}
        </div>
        <article>
          <p
            className={`text-lg flex font-semibold ${
              size === "sm" ? "flex-col" : "flex-row items-baseline"
            }`}
          >
            <span className='text-accent font-normal text-sm line-through mr-2'>
              $ {price}
            </span>
            $ {price - price * 0.1}
          </p>
          <p className={descriptionClasses}>
            {truncateDescription(description)}
          </p>
        </article>
        <button onClick={handleAddToCart} className={addToCartButtonClasses}>
          <IoCart size={22} />
          {size === "lg" || size === "md" ? "Add to cart" : ""}
        </button>
      </div>
      <div className={buttonsContainerClasses}>
        <button onClick={addToWishlist} className={favoriteButtonSizeClasses}>
          {!isWished ? (
            <IoHeartOutline
              className={classNames("text-base-300", heartIconSizeClasses)}
            />
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <IoHeart
                className={classNames("text-accent", heartIconSizeClasses)}
              />
            </motion.div>
          )}
        </button>
        <button onClick={handleAddToCart} className={cartButtonSizeClasses}>
          <IoCart className={classNames("text-xl", cartIconSizeClasses)} />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
