import { useEffect, useState } from "react";

export default function useFilterProducts({ products, category, categories }) {
  const [selectedValue, setSelectedValue] = useState();
  const [allSelectedValues, setAllSelectedValues] = useState();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSelectChange = (event, name) => {
    setSelectedValue({ [name]: event.target.value });
  };
  useEffect(() => {
    if (selectedValue) {
      if (Object.values(selectedValue)[0] === "all") {
        setAllSelectedValues((prev) =>
          prev.filter(
            (value) => Object.keys(value)[0] !== Object.keys(selectedValue)[0]
          )
        );
      } else {
        setAllSelectedValues((prev) => {
          const filtered = prev.filter(
            (value) => Object.keys(value)[0] !== Object.keys(selectedValue)[0]
          );
          return [...filtered, selectedValue];
        });
      }
    } else {
      setAllSelectedValues([]);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (allSelectedValues && allSelectedValues.length > 0) {
      const filtered = products.filter((product) => {
        return allSelectedValues.every((selectedValue) => {
          const [property, value] = Object.entries(selectedValue)[0];
          return product.properties[property] === value;
        });
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [allSelectedValues, products]);

  useEffect(() => {
    setAllSelectedValues([]);
  }, [category]);

  const parentCategory = categories.find((cat) => cat._id === category.parent);
  let properties;
  if (parentCategory) {
    const newProperties = [
      ...category.properties,
      ...parentCategory.properties,
    ];
    properties = newProperties;
  } else {
    const newProperties = [...category.properties];
    properties = newProperties;
  }

  return {
    properties,
    handleSelectChange,
    filteredProducts,
  };
}
