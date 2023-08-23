import React, { useEffect, useState } from "react";
import { UserForm } from "@/components/common";
import { useCartStore } from "@/store/useCartStore";
import useFromStore from "@/store/useFromStore";
import Link from "next/link";
import {
  IoArrowForward,
  IoLockClosed,
  IoTrashBin,
  IoChevronUp,
  IoChevronDown,
  IoAdd,
  IoRemove,
} from "react-icons/io5";
import axios from "axios";
import { useSession } from "next-auth/react";
import { LoginGoogle } from "@/components/common/LoginGoogle";

export default function cart() {
  const [sortOrder, setSortOrder] = useState(true);
  const [sortOption, setSortOption] = useState("date");
  const [paymentResult, setPaymentResult] = useState("");
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeAllById = useCartStore((state) => state.removeAllById);
  const clearCart = useCartStore((state) => state.clearCart);

  const { data: session } = useSession();

  const sortCart = cart?.map((item, index) => ({ ...item, addedAt: index }));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setPaymentResult("success");
      clearCart();
    }

    if (window?.location.href.includes("canceled")) {
      setPaymentResult("canceled");
    }
  }, []);

  async function goToPayment(data) {
    const response = await axios.post("/api/checkout", {
      ...data,
      cart: cart,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (paymentResult === "success") {
    return (
      <>
        <div className='hero min-h-screen bg-base-200'>
          <div className='hero-content text-center'>
            <div className='max-w-lg'>
              <h1 className='text-5xl font-bold'>Thanks for your order!</h1>
              <p className='py-6'>
                We will email you when your order will be sent.
              </p>
              <Link
                href={"/"}
                onClick={() => setPaymentResult("")}
                className='btn btn-primary'
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (paymentResult === "canceled") {
    return (
      <>
        <div className='hero min-h-screen bg-base-200'>
          <div className='hero-content text-center'>
            <div className='max-w-lg'>
              <h1 className='text-7xl font-bold'>OOPS...</h1>
              <h1 className='text-5xl font-bold py-6'>
                Sorry you had to cancel
              </h1>
              {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
              <Link
                href={"/cart"}
                onClick={() => setPaymentResult("")}
                className='btn btn-primary'
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (session) {
    return (
      <>
        <header className='navbar bg-base-100 border-b text-base-content px-4 lg:px-6'>
          <div className=' navbar-start space-x-2 flex items-center md:pr-6 lg:pr-12'>
            <IoLockClosed size={20} />
            <p className='flex items-center text-sm md:text-md leading-3'>
              Secure payment
            </p>
          </div>
          <Link href='/' className='text-lg md:text-2xl mr-2 navbar-center'>
            Ecommerce
          </Link>
          <Link
            href='/'
            className='navbar-end hover:text-primary flex items-center space-x-2'
          >
            <p className='hidden md:block'>Continue shopping</p>{" "}
            <p className='md:hidden'>Return</p>{" "}
            <IoArrowForward size={16} className='mt-1' />
          </Link>
        </header>

        <section className='w-section h-section p-section grid grid-cols-1 lg:grid-cols-5 gap-6 w-full'>
          <div className='lg:col-span-3'>
            <ul className='grid grid-cols-8 text-sm items-center font-semibold p-6 pb-0'>
              <li className='col-span-2'>Article</li>
              <li className='col-span-2'>Quantity</li>
              <li className='col-span-2 pl-4'>Price</li>
              <li className='col-span-2 flex whitespace-nowrap items-center'>
                <button
                  onClick={() => setSortOrder(!sortOrder)}
                  className='btn btn-square btn-ghost btn-xs'
                >
                  {sortOrder ? (
                    <IoChevronUp size={20} />
                  ) : (
                    <IoChevronDown size={20} />
                  )}
                </button>
                <select
                  className='select select-ghost select-sm focus:outline-none w-full'
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value='date'>Date</option>
                  <option value='name'>Name</option>
                  <option value='price'>Price</option>
                  <option value='quantity'>Quantity</option>
                </select>
              </li>
            </ul>
            <div className='divider'></div>

            <div className='px-6'>
              {sortCart
                ?.sort((a, b) => {
                  if (sortOption === "date") {
                    return sortOrder
                      ? a.addedAt - b.addedAt
                      : b.addedAt - a.addedAt;
                  } else if (sortOption === "price") {
                    return sortOrder
                      ? a.price * a.quantity - b.price * b.quantity
                      : b.price * b.quantity - a.price * a.quantity;
                  } else if (sortOption === "name") {
                    return sortOrder
                      ? a.title.localeCompare(b.title)
                      : b.title.localeCompare(a.title);
                  } else if (sortOption === "quantity") {
                    return sortOrder
                      ? a.quantity - b.quantity
                      : b.quantity - a.quantity;
                  }
                  return 0;
                })
                .map((product) => {
                  return (
                    <>
                      <Link href={`/product/${product._id}`}>
                        <h1 className=' text-xs sm:text-sm lg:text-base pt-4'>
                          {product.title}
                        </h1>
                      </Link>
                      <div key={product._id} className='grid grid-cols-8 py-6'>
                        {/* <====================== Product ======================> */}
                        <div className='flex flex-col col-span-2'>
                          <img
                            src={product.images[0]}
                            alt=''
                            className='object-contain h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32 '
                          />
                        </div>
                        {/* <====================== quantity ======================> */}

                        <div className='flex items-center col-span-2'>
                          <div className='join join-horizontal'>
                            <button
                              className='btn btn-xs sm:btn-sm lg:btn-md join-item'
                              onClick={() => removeFromCart(product)}
                            >
                              <IoRemove />
                            </button>
                            <p className='join-item btn-xs sm:btn-sm lg:btn-md items-center btn-square bg-base-200 justify-center flex'>
                              {product.quantity}
                            </p>
                            <button
                              className='btn btn-xs sm:btn-sm lg:btn-md join-item'
                              onClick={() => addToCart(product)}
                            >
                              <IoAdd />
                            </button>
                          </div>
                        </div>

                        {/* <====================== price ======================> */}

                        <div className='flex items-start justify-center flex-col col-span-2 pl-4'>
                          <p className='sm:text-sm text-xs tracking-wider'>
                            $ {product.price}/ea
                          </p>
                          <p className='sm:text-lg text-base tracking-wider text-primary'>
                            $ {product.price * product.quantity}
                          </p>
                        </div>

                        {/* <====================== remove ======================> */}

                        <div className='flex items-center col-span-2 justify-end'>
                          <button
                            className='btn btn-square btn-sm lg:btn-md btn-accent'
                            onClick={() => removeAllById(product)}
                          >
                            <IoTrashBin size={22} />
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className='w-full flex justify-between p-4 pb-0'>
              <p className='text-2xl font-semibold'>Total:</p>
              <p className='text-2xl font-semibold'>$ {totalPrice}</p>
            </div>
            <div className='divider'></div>
          </div>

          {/* <====================== Cart Form ======================> */}

          <div className='lg:col-span-2 md:px-0 px-4'>
            <UserForm
              Dark
              handleDataSubmit={goToPayment}
              Title='Order Information'
            />
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <header className='navbar bg-base-100 border-b text-base-content px-4 lg:px-6'>
        <div className=' navbar-start space-x-2 flex items-center md:pr-6 lg:pr-12'>
          <IoLockClosed size={20} />
          <p className='flex items-center text-sm md:text-md leading-3'>
            Secure payment
          </p>
        </div>
        <Link href='/' className='text-lg md:text-2xl mr-2 navbar-center'>
          Ecommerce
        </Link>
        <Link
          href='/'
          className='navbar-end hover:text-primary flex items-center space-x-2'
        >
          <p className='hidden md:block'>Continue shopping</p>{" "}
          <p className='md:hidden'>Return</p>{" "}
          <IoArrowForward size={16} className='mt-1' />
        </Link>
      </header>
      <section className='section grid place-content-center'>
        <LoginGoogle />
      </section>
    </>
  );
}
