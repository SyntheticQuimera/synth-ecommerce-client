import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import useFromStore from "@/store/useFromStore";
import { debounce } from "lodash";

import {
  IoCart,
  IoChevronForward,
  IoClose,
  IoHeart,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoMenu,
  IoPerson,
  IoSearch,
} from "react-icons/io5";
import axios from "axios";

const PromoHeader = () => {
  const [showPromo, setShowPromo] = useState(true);

  if (showPromo) {
    return (
      <div className='max-h-12 h-12 bg-info text-info-content flex items-center ease-in-out transition-all duration-75 delay-75 justify-center px-2 sm:px-8 md:px-12 lg:px-16'>
        <div className='mx-auto flex gap-4 items-center'>
          <h3 className='text-sm sm:text-xl font-bold'>
            volutpat lacus laoreet non curabitur <span>30% OFF</span>
          </h3>
        </div>
        <button
          className='btn btn-xs btn-square'
          onClick={() => setShowPromo(false)}
        >
          <IoClose size={20} />
        </button>
      </div>
    );
  }
  return null;
};
export const Header = ({ categories, subcategories }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalItems = useFromStore(useCartStore, (state) => state.totalItems);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(false);
      setShowSearch(false);
      setProducts([]);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  useEffect(() => {
    if (searchTerm.length > 0) {
      debouncedSearch(searchTerm);
    } else if (searchTerm.length < 0) {
      setProducts([]);
    } else {
      setProducts([]);
    }
  }, [searchTerm]);

  function searchProducts(searchTerm) {
    axios
      .get("/api/products?searchTerm=" + encodeURIComponent(searchTerm))
      .then((response) => {
        setProducts(response.data);
      });
  }

  const renderSearchResult = () => {
    return (
      searchTerm.length > 0 &&
      products.length > 0 && (
        <div className=' w-full hidden lg:block absolute translate-y-2 border border-secondary text-base-content z-50 bg-base-100 rounded-lg p-4 pt-2'>
          <div className='flex w-full items-center py-2'>
            <p className='text-sm'>Search result:</p>
            <button
              onClick={() => setProducts([])}
              className='ml-auto btn btn-circle btn-xs btn-secondary'
            >
              <IoClose size={22} />
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            {products?.slice(0, 10).map((product, index) => (
              <Link
                key={index}
                href={"/product/" + product._id}
                className='hover:opacity-80'
              >
                <div className='flex gap-2 items-center'>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className='w-12 h-12 object-contain rounded-md'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm'>{product.title}</span>
                    <span className='text-sm'>$ {product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )
    );
  };

  const renderSearchResultMobile = () => {
    return (
      searchTerm.length > 0 &&
      products.length > 0 && (
        <div className=' w-full absolute border lg:hidden border-secondary text-base-content z-50 bg-base-100 rounded-lg rounded-t-none p-4 pt-2'>
          <div className='flex w-full items-center py-2'>
            <p className='text-sm'>Search result:</p>
            <button
              onClick={() => setProducts([])}
              className='ml-auto btn btn-circle btn-xs btn-secondary'
            >
              <IoClose size={22} />
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            {products?.slice(0, 10).map((product, index) => (
              <Link
                key={index}
                href={"/product/" + product._id}
                className='hover:opacity-80'
              >
                <div className='flex gap-2 items-center'>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className='w-12 h-12 object-contain rounded-md'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm'>{product.title}</span>
                    <span className='text-sm'>$ {product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )
    );
  };

  const renderCategories = () => {
    return (
      <nav className='navbar p-4 lg:px-12 relative z-40 py-2 shadow'>
        <ul className='menu gap-2 menu-horizontal w-full'>
          {categories?.map((category, index) => (
            <li key={index}>
              {subcategories[category._id]?.length > 0 ? (
                <details>
                  <summary>
                    <Link
                      href={"/categories/category/" + category._id}
                      className='hover:opacity-80'
                    >
                      {category.name}
                    </Link>
                  </summary>
                  <ul>
                    {subcategories[category._id]?.map(
                      (subcategory, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={"/categories/category/" + subcategory._id}
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </details>
              ) : (
                <Link href={"/categories/category/" + category._id}>
                  {category.name}
                </Link>
              )}
            </li>
          ))}
          <li className='ml-auto'>
            <Link href={"/categories"}>
              View all categories
              <IoChevronForward size={16} />
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  const renderDesktopHeader = () => {
    return (
      <header className='hidden lg:flex flex-col w-full'>
        <div className='grid grid-cols-8 bg-neutral text-neutral-content p-6 lg:px-12'>
          <div className='col-span-2 items-center flex'>
            <Link href='/' className='font-black md:text-xl lg:text-3xl'>
              Ecommerce
            </Link>
          </div>
          <div className='col-span-4 relative'>
            <div className='join text-base-content w-full'>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className='input join-item w-full focus:outline-none'
                placeholder='Search...'
              />
              <select className='select join-item focus:outline-none'>
                <option defaultValue>All Categories</option>
                {categories?.map((category) => (
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
              <div className='indicator'>
                <button className='btn btn-primary join-item'>Search</button>
              </div>
            </div>
            {renderSearchResult()}
          </div>

          <div className='col-span-2'>
            <div className='flex space-x-4 justify-end w-full'>
              <Link href={"/user"} className='btn btn-square'>
                <IoPerson size={22} />
              </Link>
              <Link href={"/user/wishlist"} className='btn btn-square'>
                <IoHeart size={22} />
              </Link>
              <div className='dropdown dropdown-end'>
                {cart?.length > 0 ? (
                  <div className='indicator'>
                    <label
                      tabIndex={0}
                      className='btn btn-square relative btn-primary'
                    >
                      <span className='badge badge-warning indicator-item'>
                        {totalItems}
                      </span>
                      <IoCart size={22} />
                    </label>
                  </div>
                ) : (
                  <label tabIndex={0} className='btn btn-square'>
                    <IoCart size={22} />
                  </label>
                )}
                <div
                  tabIndex={0}
                  className='mt-3 card card-compact z-50 dropdown-content w-52 bg-secondary text-secondary-content shadow'
                >
                  <div className='card-body'>
                    <span className='font-bold text-lg'>
                      {totalItems} {totalItems > 1 ? "products" : "product"}
                    </span>
                    <span>Subtotal: $ {totalPrice}</span>
                    <div className='card-actions'>
                      <Link
                        href={"/cart"}
                        className='btn btn-primary btn-block'
                      >
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderCategories()}
      </header>
    );
  };

  const renderMobileHeader = () => {
    return (
      <header className='lg:hidden navbar px-4 bg-neutral text-neutral-content'>
        <div className='navbar-start'>
          <div className='h-full flex items-center'>
            <Link href='/' className='font-black text-lg'>
              Ecommerce
            </Link>
          </div>
        </div>
        <div className='navbar-end space-x-2'>
          <Link href={"/user"} className='btn btn-square btn-sm'>
            <IoPerson size={22} />
          </Link>
          <Link href={"/user/wishlist"} className='btn btn-square btn-sm'>
            <IoHeart size={22} />
          </Link>
          {cart?.length > 0 ? (
            <Link
              href={"/cart"}
              className='btn btn-square btn-sm relative btn-primary'
            >
              <span className='badge badge-sm badge-warning absolute bottom-6 left-3'>
                {totalItems}
              </span>
              <IoCart size={22} />
            </Link>
          ) : (
            <Link href={"/cart"} className='btn btn-square btn-sm'>
              <IoCart size={22} />
            </Link>
          )}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className='btn btn-square btn-sm'
          >
            {showSearch ? <IoClose size={22} /> : <IoSearch size={22} />}
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='btn btn-square btn-sm'
          >
            {showMenu ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>
        </div>
      </header>
    );
  };

  const renderMobileMenu = () => {
    return (
      showMenu && (
        <ul className='menu menu-lg px-4 rounded-none bg-neutral text-neutral-content w-full lg:hidden'>
          <li>
            <details open>
              <summary className='active:bg-neutral-focus hover:bg-neutral-focus'>
                Categories
              </summary>
              <ul>
                {categories?.map((category, index) => (
                  <li key={index}>
                    {subcategories[category._id]?.length > 0 ? (
                      <details>
                        <summary className='active:bg-neutral-focus hover:bg-neutral-focus'>
                          <Link
                            href={"/categories/category/" + category._id}
                            className='hover:opacity-60'
                          >
                            {category.name}
                          </Link>
                        </summary>
                        <ul>
                          {subcategories[category._id]?.map(
                            (subcategory, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={
                                    "/categories/category/" + subcategory._id
                                  }
                                  className='active:bg-neutral-focus hover:bg-neutral-focus'
                                >
                                  {subcategory.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={"/categories/category/" + category._id}
                        className='active:bg-neutral-focus hover:bg-neutral-focus'
                      >
                        {category.name}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href={"/categories"}
                    className='active:bg-neutral-focus relative hover:bg-neutral-focus justify-between'
                  >
                    View all categories
                    <IoChevronForward
                      size={17}
                      className='absolute right-[18px]'
                    />
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <div className='space-x-6 flex w-full h-16 items-center justify-center'>
            <a
              href='https://www.facebook.com/'
              target='_blank'
              className='btn btn-sm btn-neutral btn-square'
            >
              <IoLogoFacebook size={22} />
            </a>
            <a
              href='https://www.instagram.com/'
              target='_blank'
              className='btn btn-sm btn-neutral btn-square'
            >
              <IoLogoInstagram size={22} />
            </a>
            <a
              href='https://www.linkedin.com/'
              target='_blank'
              className='btn btn-sm btn-neutral btn-square'
            >
              <IoLogoLinkedin size={22} />
            </a>
            <a
              href='https://twitter.com/'
              target='_blank'
              className='btn btn-sm btn-neutral btn-square'
            >
              <IoLogoTwitter size={22} />
            </a>
            <a
              href='https://web.whatsapp.com/'
              target='_blank'
              className='btn btn-sm btn-neutral btn-square'
            >
              <IoLogoWhatsapp size={22} />
            </a>
          </div>
        </ul>
      )
    );
  };

  const renderMobileSearchBar = () => {
    return (
      showSearch && (
        <>
          <div className='bg-neutral px-4 h-16 lg:hidden'>
            <div className='join text-base-content w-full'>
              <input
                className='input join-item w-full focus:outline-none'
                placeholder='Search...'
              />
              <select className='select join-item focus:outline-none'>
                <option defaultValue>All Categories</option>
                {categories?.map((category) => (
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
              <div className='indicator'>
                <button className='btn btn-primary join-item'>Search</button>
              </div>
            </div>
          </div>
          {renderSearchResultMobile()}
        </>
      )
    );
  };

  return (
    <>
      <PromoHeader />
      {renderDesktopHeader()}
      {renderMobileHeader()}
      {renderMobileMenu()}
      {renderMobileSearchBar()}
    </>
  );
};
