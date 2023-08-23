import React from "react";
import Link from "next/link";

export const FilterSidebar = ({
  categories,
  subcategories,
  properties,
  handleSelectChange,
}) => {
  return (
    <aside className='hidden bg-neutral text-neutral-content py-6 px-2 lg:block h-fit rounded-box'>
      <nav className='scrollbar-custom overflow-hidden overflow-y-auto max-h-[calc(100vh-80px)] w-fit min-w-fit'>
        <h1 className='text-lg p-4 py-0'>Categories</h1>
        <ul className='menu min-w-[14rem]  w-full'>
          {categories?.map((category, index) => {
            const subcategoriesWithParent = subcategories[category._id] || [];
            const hasSubcategories = subcategoriesWithParent.length > 0;

            return (
              <li key={index}>
                {hasSubcategories ? (
                  <details>
                    <summary>
                      <Link href={`/categories/category/${category._id}`}>
                        {category.name}
                      </Link>
                    </summary>
                    <ul>
                      {subcategoriesWithParent.map((subcategory, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={`/categories/category/${subcategory._id}`}
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a>{category.name}</a>
                )}
              </li>
            );
          })}
        </ul>
        {properties?.length > 0 && (
          <>
            <h1 className='text-lg p-4 pb-12'>Filter</h1>
            <div className='flex flex-col px-6 gap-4 w-full justify-center'>
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
              {properties?.map((property, index) => (
                <div key={index} className='flex flex-col gap-2'>
                  <label className='text-sm'>{property.name}</label>
                  <select
                    onChange={(event) =>
                      handleSelectChange(event, property.name)
                    }
                    className='select select-ghost focus:outline-none w-full'
                  >
                    <option value='all'>All</option>
                    {property.values.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};
