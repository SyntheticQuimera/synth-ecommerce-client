import React, { useEffect, useState } from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoGrid,
  IoReorderFour,
} from "react-icons/io5";
import { Layout, Title } from "@/components/common";

export const CategoryLayout = ({ children, categories }) => {
  const [sortOrder, setSortOrder] = useState(true);
  const [sortOption, setSortOption] = useState("date");
  const [gridFlow, setGridFlow] = useState(true);
  const [size, setSize] = useState("md");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      let newSize = "md";
      if (isMobile) {
        newSize = gridFlow ? "lg" : "sm";
      } else if (!isMobile) {
        newSize = gridFlow ? "md" : "xl";
      }
      setSize(newSize);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gridFlow]);

  return (
    <Layout categories={categories}>
      <div className='mx-auto px-4 max-w-7xl py-6'>
        <div className='flex lg:flex-row flex-col gap-4'>
          {/* <================= Category & Filter nav ===============> */}
          <aside className='hidden lg:block bg-neutral text-neutral-content rounded-box overflow-hidden w-fit min-w-fit h-fit'>
            <Title title={"Categories"} />
            <ul className='menu w-56 '>
              {categories?.map((category, index) => (
                <li key={index}>
                  {category.subcategories.length > 0 ? (
                    <details>
                      <summary>{category.name}</summary>
                      <ul>
                        {category.subcategories.map((subcategory, subIndex) => (
                          <li key={subIndex}>
                            <a>{subcategory}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a>{category.category}</a>
                  )}
                </li>
              ))}
            </ul>
            <Title title={"Filter by price"} />
            <form>
              <div className='space-y-2 relative p-8'>
                <div className='flex justify-between px-2'>
                  <div
                    className='tooltip tooltip-open tooltip-secondary'
                    data-tip='$0'
                  />
                  <div
                    className='tooltip tooltip-open tooltip-secondary'
                    data-tip='$2000'
                  />
                </div>
                <input
                  type='range'
                  min={0}
                  max='100'
                  className='range range-primary range-xs bg-secondary'
                />
              </div>
              <div className='flex w-full justify-center pt-0 p-8'>
                <button className='btn btn-primary w-full'>Filter</button>
              </div>
            </form>
          </aside>
          {/* <================= Category & Filter Accordion ===============> */}

          <div className='lg:hidden join join-vertical w-full'>
            <div tabIndex='0' className='collapse collapse-arrow join-item'>
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium'>
                Categories
              </div>
              <div className='collapse-content'>
                <ul className='menu'>
                  {categories.map((category, index) => (
                    <li key={index}>
                      {category.subcategories.length > 0 ? (
                        <details>
                          <summary>{category.name}</summary>
                          <ul>
                            {category.subcategories.map(
                              (subcategory, subIndex) => (
                                <li key={subIndex}>
                                  <a>{subcategory}</a>
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      ) : (
                        <a>{category.category}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='collapse collapse-arrow join-item'>
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium'>
                Filter by price
              </div>
              <div className='collapse-content'>
                <form>
                  <div className='space-y-2 relative p-8'>
                    <div className='flex justify-between px-2'>
                      <div
                        className='tooltip tooltip-open tooltip-secondary'
                        data-tip='$0'
                      />
                      <div
                        className='tooltip tooltip-open tooltip-secondary'
                        data-tip='$2000'
                      />
                    </div>
                    <input
                      type='range'
                      min={0}
                      max='100'
                      className='range range-primary range-xs bg-secondary'
                    />
                  </div>
                  <div className='flex w-full justify-center pt-0 p-8'>
                    <button className='btn btn-primary rounded-lg w-full'>
                      Filter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* <================= Products ===============> */}

          <section className='w-full'>
            <nav className='flex justify-between w-full items-center p-4'>
              <div className='flex gap-2 h-full'>
                <button
                  onClick={() => setGridFlow(true)}
                  className='btn btn-square'
                >
                  <IoGrid size={22} />
                </button>
                <button
                  onClick={() => setGridFlow(false)}
                  className='btn btn-square'
                >
                  <IoReorderFour size={22} />
                </button>
              </div>
              <div className='flex gap-2 items-center h-full'>
                <button
                  onClick={() => setSortOrder(!sortOrder)}
                  className='btn btn-square btn-ghost'
                >
                  {sortOrder ? (
                    <IoChevronUp size={22} />
                  ) : (
                    <IoChevronDown size={22} />
                  )}
                </button>
                <select
                  className='select select-ghost focus:outline-none'
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value='date'>Date</option>
                  <option value='name'>Name</option>
                  <option value='price'>Price</option>
                </select>
              </div>
            </nav>
            <div className='gap-4 sm:gap-2 md:gap-4 flex justify-center md:justify-start px-4 flex-wrap'>
              {children}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
