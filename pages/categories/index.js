import React from "react";
import fetchData from "@/lib/fetchData";
import {
  Layout,
  CardProduct,
  FilterSidebar,
  FilterAccordion,
  CardSorter,
} from "@/components/common";
import { useSortAndGridFlow } from "@/hooks/useSortAndGridFlow";

export default function products({
  products,
  categories,
  subcategories,
  wishedProducts,
}) {
  const {
    sortOrder,
    sortOption,
    size,
    handleSortOptionChange,
    handleSortOrderToggle,
    handleGridFlowChange,
  } = useSortAndGridFlow("date", true);

  return (
    <Layout categories={categories} subcategories={subcategories}>
      <div className='mx-auto px-4 max-w-7xl py-6'>
        <div className='flex lg:flex-row flex-col gap-4'>
          {/* <================= Category & Filter nav ===============> */}
          <FilterSidebar
            categories={categories}
            subcategories={subcategories}
          />
          {/* <================= Category & Filter Accordion ===============> */}

          <FilterAccordion
            categories={categories}
            subcategories={subcategories}
          />

          {/* <================= Products ===============> */}

          <section className='w-full'>
            <CardSorter
              sortOrder={sortOrder}
              sortOption={sortOption}
              handleSortOptionChange={handleSortOptionChange}
              handleSortOrderToggle={handleSortOrderToggle}
              handleGridFlowChange={handleGridFlowChange}
            />
            <div className='gap-4 sm:gap-2 md:gap-4 flex justify-center md:justify-start px-4 flex-wrap'>
              {products
                ?.sort((a, b) => {
                  if (sortOption === "date") {
                    return sortOrder
                      ? new Date(a.createdAt) - new Date(b.createdAt)
                      : new Date(b.createdAt) - new Date(a.createdAt);
                  } else if (sortOption === "price") {
                    return sortOrder ? a.price - b.price : b.price - a.price;
                  } else if (sortOption === "name") {
                    return sortOrder
                      ? a.title.localeCompare(b.title)
                      : b.title.localeCompare(a.title);
                  }
                  return 0;
                })
                .map((product) => (
                  <CardProduct
                    key={product._id}
                    _id={product._id}
                    product={product}
                    title={product.title}
                    images={product.images[0]}
                    price={product.price}
                    description={product.description}
                    size={size}
                    wished={wishedProducts.includes(product._id)}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData(context);

  return {
    props: {
      products: data.products,
      categories: data.categories,
      subcategories: data.subcategories,
      wishedProducts: data.wishedProducts,
    },
  };
}
