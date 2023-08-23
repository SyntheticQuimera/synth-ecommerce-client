"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TbShoppingBag,
  TbSearch,
  TbChevronDown,
  TbMenu,
  TbArrowRight,
  TbX,
  TbUser,
  TbTrash,
} from "react-icons/tb";
import { useCartStore } from "@/store/useCartStore";
import useFromStore from "@/store/useFromStore";
import useCloseClickOut from "@/hooks/useCloseClickOut";

export const Header = () => {
  // <=================== State ===================>

  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartRef = useRef();

  useCloseClickOut(setShowCart, cartRef);

  // <=================== Cart Store ===================>

  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalItems = useFromStore(useCartStore, (state) => state.totalItems);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  const removeAllById = useCartStore((state) => state.removeAllById);

  // <=================== Transitions and effects ===================>

  const opacityTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25 },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowProducts(false);
      setShowCategories(false);
      setShowMenu(false);
      setShowSearch(false);
      setShowCart(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // <=================== Header Components ===================>

  const PromoHeader = () => {
    if (showPromo) {
      return (
        <div
          className='max-h-12 h-12 primary-bg flex items-center ease-in-out transition-all duration-75 delay-75 justify-center px-8 md:px-12 lg:px-16 
      '>
          <div className='mx-auto flex gap-4 items-center'>
            <h1>volutpat lacus laoreet non curabitur</h1>
            <h1>30% OFF</h1>
          </div>
          <button onClick={() => setShowPromo(false)}>
            <TbX size={22} />
          </button>
        </div>
      );
    }
  };

  const CategoriesMenu = () => {
    return (
      <motion.div
        {...opacityTransition}
        onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}
        className='w-full border-t border-t-zinc-600 -translate-y-[2px] sub-nav-bg backdrop-blur-lg hidden md:flex items-center justify-between px-24'>
        <ul className='flex'>
          <li className='nav-submenu-item'>
            <Link href='/' className='py-4 px-4 grow'>
              Category
            </Link>
          </li>
          <li className='nav-submenu-item'>
            <Link href='/' className='py-4 px-4 grow'>
              Category
            </Link>
          </li>
          <li className='nav-submenu-item'>
            <Link href='/' className='py-4 px-4 grow'>
              Category
            </Link>
          </li>
          <li className='nav-submenu-item'>
            <Link href='/' className='py-4 px-4 grow'>
              Category
            </Link>
          </li>
        </ul>
        <Link
          href='/'
          className='font-semibold hover:text-[#76b852] inline-flex items-center gap-2 hover:cursor-pointer'>
          View all categories <TbArrowRight size={16} />
        </Link>
      </motion.div>
    );
  };

  const ProductsMenu = () => {
    return (
      <motion.div
        {...opacityTransition}
        onMouseEnter={() => setShowProducts(true)}
        onMouseLeave={() => setShowProducts(false)}
        className='w-full h-fit sub-nav-bg border-t border-t-zinc-600 -translate-y-[2px] backdrop-blur-lg  hidden md:flex md:flex-row px-16'>
        <div className='max-w-prose border-x border-zinc-600'>
          <div className='flex flex-col bg-slate-800 overflow-hidden items-center justify-center'>
            <div className='w-52 h-64'>
              <img
                src='https://th.bing.com/th/id/R.eb2006948f6da844ea1b690fe9cbfc1a?rik=X0W1XER2M3h4dA&pid=ImgRaw&r=0'
                alt=''
                className='h-full object-contain bg-white w-full'
              />
            </div>
            <div className='h-36 max-h-36 w-full py-2 px-4 min-h-max'>
              <h1 className='text-lg font-semibold'>MacBook Pro 16.6</h1>
              <p className='text-white/80 text-sm'>Odio feugiat pretium...</p>
              <div className='flex my-2'>
                <TbStarFilled size={22} />
                <TbStarFilled size={22} />
                <TbStarFilled size={22} />
                <TbStarFilled size={22} />
                <TbStar size={22} />
              </div>
              <p className='text-xl text-[#76b852]'>$1200</p>
            </div>
          </div>
        </div>
        <div className='max-w-sm min-w-max w-full flex flex-col items-center p-4 border-r border-zinc-600'>
          <div className='flex mb-4'>
            <h1 className='text-3xl'>Last Viewed Items</h1>
          </div>
          <div className='flex flex-col justify-between h-full w-full'>
            <div className='w-full bg-zinc-800  overflow-hidden gap-4 flex h-24'>
              <img
                src='https://th.bing.com/th/id/R.eb2006948f6da844ea1b690fe9cbfc1a?rik=X0W1XER2M3h4dA&pid=ImgRaw&r=0'
                alt=''
                className='h-full object-contain bg-white w-24'
              />
              <div className='block py-1'>
                <h1 className='font-semibold'>Product Name</h1>
                <p>
                  <span className='text-[#76b852]'>$1200</span>
                </p>
                <div className='flex'>
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStar size={18} />
                </div>
              </div>
            </div>

            <div className='w-full bg-zinc-800 gap-4 flex h-24'>
              <img
                src='https://th.bing.com/th/id/R.eb2006948f6da844ea1b690fe9cbfc1a?rik=X0W1XER2M3h4dA&pid=ImgRaw&r=0'
                alt=''
                className='h-full object-contain bg-white w-24'
              />
              <div className='block py-1'>
                <h1 className='font-semibold'>Product Name</h1>
                <p>
                  <span className='text-[#76b852] '>$1200</span>
                </p>
                <div className='flex'>
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStar size={18} />
                </div>
              </div>
            </div>

            <div className='w-full bg-zinc-800 gap-4 flex h-24'>
              <img
                src='https://th.bing.com/th/id/R.eb2006948f6da844ea1b690fe9cbfc1a?rik=X0W1XER2M3h4dA&pid=ImgRaw&r=0'
                alt=''
                className='h-full object-contain bg-white w-24'
              />
              <div className='block py-1'>
                <h1 className='font-semibold'>Product Name</h1>
                <p>
                  <span className='text-[#76b852] '>$1200</span>
                </p>
                <div className='flex'>
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStarFilled size={18} />
                  <TbStar size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-md min-w-max  flex flex-col items-center p-4 border-r border-zinc-600'></div>
      </motion.div>
    );
  };

  const CartMenu = () => {
    return (
      <motion.div
        ref={cartRef}
        {...opacityTransition}
        className='!w-[24rem] flex-col absolute right-0 top-[100%] border-t border-t-zinc-600 sub-nav-bg backdrop-blur-lg -translate-y-[2px] hidden md:flex items-center'>
        <div className='py-2 uppercase font-semibold border-b border-b-zinc-600 text-center w-full'>
          Shopping bag
        </div>

        {cart.length > 0 ? (
          cart?.slice(-3).map((cartItem) => (
            <div
              key={cartItem._id}
              className='flex w-full p-4 border-b border-b-zinc-600'>
              <div className='w-full gap-4 flex h-20'>
                <img
                  src={cartItem.images[0]}
                  alt=''
                  className='h-full object-contain bg-white w-20'
                />
                <div className='block py-1'>
                  <h1 className='font-semibold'>{cartItem.title}</h1>
                  <p className='text-sm'>
                    Price:&nbsp;
                    <span className='text-[#76b852] font-semibold'>
                      $&nbsp;{cartItem.price}
                    </span>
                  </p>
                  <div className='flex gap-4'>
                    <p className='text-sm'>
                      Quantity:&nbsp;
                      <span className='text-[#76b852] font-semibold'>
                        {cartItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
                <div className='flex h-full w-fit ml-auto items-center justify-end'>
                  <button onClick={() => removeAllById(cartItem)}>
                    <motion.div whileTap={{ scale: 0.8 }}>
                      <TbTrash size={24} />
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex w-full justify-center p-4 border-b border-b-zinc-600'>
            <p className='text-xl uppercase font-semibold opacity-50'>
              Your bag is empty
            </p>
          </div>
        )}

        <div className='flex p-4 justify-between items-center w-full'>
          <p className='text-[#76b852] text-lg font-semibold'>
            $&nbsp;{totalPrice}
          </p>
          <Link
            href='/'
            className='font-semibold hover:text-[#76b852] inline-flex items-center gap-2 hover:cursor-pointer'>
            View all cart <TbArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    );
  };

  const MobileSearch = () => {
    return (
      <motion.div
        {...opacityTransition}
        className='md:hidden border-t border-t-zinc-600 backdrop-blur-lg -translate-y-[2px] sub-nav-bg py-2 font-semibold uppercase'>
        <input type='text' placeholder='Search...' className='search-input' />
      </motion.div>
    );
  };

  const MobileNavMenu = () => {
    return (
      <motion.nav className='md:hidden border-t border-t-zinc-600 -translate-y-[2px] font-semibold uppercase'>
        <ul className='flex flex-col whitespace-nowrap nav-bg'>
          <li className='flex hover:bg-zinc-700'>
            <Link href='/' className='grow py-4 px-6'>
              Home
            </Link>
          </li>
          <li className='flex hover:bg-zinc-700'>
            <Link href='/' className='grow py-4 px-6'>
              Products
            </Link>
          </li>
          <li className='flex flex-col'>
            <div
              onClick={() => setShowCategories(!showCategories)}
              className='flex items-center py-4 px-6 hover:cursor-pointer hover:bg-zinc-700'>
              <p>Categories</p>
              <TbChevronDown size={16} className='ml-auto' />
            </div>

            {/*<=================== Categories Submenu ===================> */}
            {showCategories && (
              <motion.div
                {...opacityTransition}
                className='w-full md:hidden capitalize'>
                <ul className='flex flex-col font-normal'>
                  <li className='flex items-center hover:bg-zinc-700'>
                    <Link href='/' className='grow py-4 px-8'>
                      Category
                    </Link>
                  </li>
                  <li className='flex items-center hover:bg-zinc-700'>
                    <Link href='/' className='grow py-4 px-8'>
                      Category
                    </Link>
                  </li>
                  <li className='flex items-center hover:bg-zinc-700'>
                    <Link href='/' className='grow py-4 px-8'>
                      Category
                    </Link>
                  </li>
                </ul>
                <Link
                  href='/'
                  className='flex items-center py-4 px-8 hover:cursor-pointer hover:bg-zinc-700'>
                  <p>View all categories</p>
                  <TbArrowRight size={16} className='ml-auto' />
                </Link>
              </motion.div>
            )}
          </li>
        </ul>
      </motion.nav>
    );
  };

  return (
    <>
      {/*<=================== Desktop Header ===================> */}
      <header
        className={`hidden md:flex flex-col fixed w-full z-50 ease-in-out duration-75 transition-all ${
          showPromo && isScrolled ? "-translate-y-12" : " translate-y-0"
        }`}>
        {/*<=================== Promo Header ===================> */}
        <PromoHeader />
        {/*<=================== Navigation ===================> */}
        <div
          className={`w-full bg-zinc-800 text-white relative ease-in-out duration-300 transition-all flex items-center px-8 ${
            isScrolled ? "h-16" : "h-24"
          }`}>
          {/*<=================== Logo ===================> */}

          <div className='h-full flex items-center justify-center pl-4 md:pr-6 lg:pr-12'>
            <Link href='/' className='font-black md:text-xl lg:text-3xl'>
              Ecommerce
            </Link>
          </div>
          <nav className='flex w-full justify-between h-full font-semibold uppercase'>
            {!showSearch && (
              <ul className='flex pl-6 whitespace-nowrap'>
                <li className='h-full flex items-center justify-center px-4'>
                  <Link href='/'>Home</Link>
                </li>
                <li
                  // onMouseEnter={() => setShowProducts(true)}
                  // onMouseLeave={() => setShowProducts(false)}
                  className='h-full flex items-center justify-center px-4'>
                  <Link href='/' className='inline-flex items-center gap-2'>
                    Products
                    {/* <TbChevronDown size={16} /> */}
                  </Link>
                </li>
                <li
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                  className='h-full flex items-center justify-center px-4'>
                  <Link href='/' className='inline-flex items-center gap-2'>
                    Categories <TbChevronDown size={16} />
                  </Link>
                </li>
              </ul>
            )}

            <div className='flex w-full justify-end'>
              {/*<=================== Search Bar ===================> */}
              <div
                className={`border-zinc-700 border-x transition-all ease-in-out duration-300 hidden md:flex items-center ${
                  !showSearch ? "w-0 border-none" : "grow"
                }`}>
                <input
                  type='text'
                  placeholder='Search...'
                  className='search-input'
                />
              </div>

              {/*<=================== Navigation Icons ===================> */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className='h-full flex items-center justify-center px-4'>
                {!showSearch ? (
                  <motion.div whileTap={{ scale: 0 }}>
                    <TbSearch size={24} />
                  </motion.div>
                ) : (
                  <motion.div whileTap={{ scale: 0 }}>
                    <TbX size={24} />
                  </motion.div>
                )}
              </button>
              <div className='h-full flex items-center justify-center px-2'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  ref={cartRef}
                  onClick={() => setShowCart(!showCart)}
                  className='relative p-2'>
                  <TbShoppingBag size={24} />
                  <div className='absolute top-0 right-0 w-4 h-4 rounded-full bg-[#76b852] text-xs text-white flex items-center justify-center'>
                    {totalItems}
                  </div>
                </motion.button>
              </div>
              <div className='h-full flex items-center justify-center px-4'>
                <TbUser size={24} />
              </div>
            </div>
          </nav>
          {showCart && <CartMenu />}
        </div>

        {/*<=================== Submenu ===================> */}
        {/*
        {showProducts && (
          <ProductsMenu />
        )} */}

        {showCategories && <CategoriesMenu />}
      </header>

      {/*<=================== Mobile Header ===================> */}
      <header
        className={`md:hidden flex-col z-50 fixed w-full ease-in-out transition-all duration-300 ${
          showPromo && isScrolled ? "-translate-y-12" : " translate-y-0"
        }`}>
        {/*<=================== Promo Header ===================> */}
        <PromoHeader />
        {/*<=================== Navigation ===================> */}

        <div className='flex h-16 items-center px-2 nav-bg'>
          <div className='h-full flex items-center justify-center pl-4 pr-6'>
            <Link href='/' className='font-black text-md'>
              Ecommerce
            </Link>
          </div>

          {/*<=================== Navigation Icons ===================> */}
          <nav className='flex ml-auto h-full font-semibold'>
            <div className='flex'>
              <button
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowMenu(false);
                }}
                className='h-full flex items-center justify-center px-4'>
                {!showSearch ? (
                  <motion.div whileTap={{ scale: 0 }}>
                    <TbSearch size={24} />
                  </motion.div>
                ) : (
                  <motion.div whileTap={{ scale: 0 }}>
                    <TbX size={24} />
                  </motion.div>
                )}
              </button>
              <div className='h-full flex items-center justify-center px-2'>
                <div className='relative p-2'>
                  <TbShoppingBag size={24} />
                  <div className='absolute top-0 right-0 w-4 h-4 rounded-full bg-[#76b852] text-xs text-white flex items-center justify-center'>
                    {totalItems}
                  </div>
                </div>
              </div>
              <div className='h-full flex items-center justify-center px-4'>
                <TbUser size={24} />
              </div>
              <button
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowSearch(false);
                }}
                className='h-full flex items-center justify-center px-4'>
                {!showMenu ? (
                  <motion.div whileTap={{ scale: 0 }}>
                    <TbMenu size={24} />
                  </motion.div>
                ) : (
                  <motion.div whileTap={{ scale: 0 }}>
                    <TbX size={24} />
                  </motion.div>
                )}
              </button>
            </div>
          </nav>
        </div>

        {/*<=================== Search Bar ===================> */}
        {showSearch && <MobileSearch />}

        {/*<=================== Menu ===================> */}
        {showMenu && <MobileNavMenu />}
      </header>
    </>
  );
};
