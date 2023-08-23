import Link from "next/link";
import React from "react";

export const FilterAccordion = ({
  categories,
  subcategories,
  properties,
  handleSelectChange,
}) => {
  return (
    <div className='lg:hidden bg-neutral text-neutral-content  join join-vertical w-full'>
      <div tabIndex='0' className='collapse collapse-arrow join-item'>
        <input type='checkbox' />
        <div className='collapse-title text-xl font-medium'>Categories</div>
        <div className='collapse-content'>
          <ul className='menu'>
            {categories.map((category, index) => {
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
                        {subcategoriesWithParent.map(
                          (subcategory, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={`/categories/category/${subcategory._id}`}
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </details>
                  ) : (
                    <a>{category.name}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {properties?.length > 0 && (
        <div className='collapse  collapse-arrow join-item'>
          <input type='checkbox' />
          <div className='collapse-title text-xl font-medium'>Filter</div>
          <div className='collapse-content'>
            <div className='space-y-8 p-4'>
              <div className='px-2 pt-8'>
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
          </div>
        </div>
      )}
    </div>
  );
};
