import React, { useEffect, useState } from "react";
import fetchData from "@/lib/fetchData";
import {
  Layout,
  CardProduct,
  FilterSidebar,
  FilterAccordion,
  CardSorter,
  Title,
} from "@/components/common";
import { Product } from "@/models/Product";
import { useSortAndGridFlow } from "@/hooks/useSortAndGridFlow";
import { Category } from "@/models/Category";

export default function CategoryPage({
  products,
  categories,
  subcategories,
  category,
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

  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSelectChange = (event, name) => {
    const newSelectedValues = [...selectedValues];
    const selectedIndex = newSelectedValues.findIndex(
      (value) => Object.keys(value)[0] === name
    );
    if (event.target.value === "all") {
      if (selectedIndex !== -1) {
        newSelectedValues.splice(selectedIndex, 1);
      }
    } else {
      const newSelectedValue = { [name]: event.target.value };
      if (selectedIndex !== -1) {
        newSelectedValues[selectedIndex] = newSelectedValue;
      } else {
        newSelectedValues.push(newSelectedValue);
      }
    }
    setSelectedValues(newSelectedValues);
  };

  useEffect(() => {
    if (selectedValues.length > 0) {
      const filtered = products.filter((product) =>
        selectedValues.every((selectedValue) => {
          const [property, value] = Object.entries(selectedValue)[0];
          return (
            product.properties &&
            product.properties[property] === value
          );
        })
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedValues, products]);

  const parentCategory = categories.find((cat) => cat._id === category.parent);
  const properties = parentCategory
    ? [...category.properties, ...parentCategory.properties]
    : [...category.properties];

  return (
    <Layout categories={categories} subcategories={subcategories}>
      <div className='mx-auto px-4 max-w-7xl py-6'>
        <div className='flex lg:flex-row flex-col gap-4'>
          <FilterSidebar
            categories={categories}
            subcategories={subcategories}
            properties={properties}
            handleSelectChange={handleSelectChange}
          />

          <FilterAccordion
            categories={categories}
            subcategories={subcategories}
            properties={properties}
            handleSelectChange={handleSelectChange}
          />

          <section className='w-full'>
            <CardSorter
              sortOrder={sortOrder}
              sortOption={sortOption}
              handleSortOptionChange={handleSortOptionChange}
              handleSortOrderToggle={handleSortOrderToggle}
              handleGridFlowChange={handleGridFlowChange}
            />
            <Title title={category.name} className='md:pl-6 md:pt-2' />

            <div className='gap-4 sm:gap-2 md:gap-4 flex justify-center md:justify-start px-4 flex-wrap'>
              {filteredProducts
                .sort((a, b) => {
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
                    id={product._id}
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
  const categoryId = context.query.id;
  const category = await Category.findById(categoryId);
  const isCategory = data.categories.some(
    (category) => category._id === categoryId
  );

  let filteredProducts;
  if (isCategory) {
    const subcategoriesWithParent = data.subcategories[categoryId] || [];
    const parentCategories = subcategoriesWithParent.map(
      (subcategory) => subcategory._id
    );
    filteredProducts = await Product.find(
      { category: { $in: parentCategories } },
      null,
      { sort: { _id: -1 } }
    );
  } else {
    filteredProducts = await Product.find({ category: categoryId }, null, {
      sort: { _id: -1 },
    });
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(filteredProducts)),
      categories: data.categories,
      subcategories: data.subcategories,
      category: JSON.parse(JSON.stringify(category)),
      wishedProducts: data.wishedProducts,
    },
  };
}
