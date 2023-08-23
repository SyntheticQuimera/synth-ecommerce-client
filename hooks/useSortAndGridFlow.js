import { useEffect, useState } from "react";

export const useSortAndGridFlow = (initialSortOption, initialGridFlow) => {
  const [sortOrder, setSortOrder] = useState(true);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [gridFlow, setGridFlow] = useState(initialGridFlow);
  const [size, setSize] = useState("md");

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prevSortOrder) => !prevSortOrder);
  };

  const handleGridFlowChange = (value) => {
    setGridFlow(value);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      const newSize = isMobile
        ? gridFlow
          ? "lg"
          : "sm"
        : gridFlow
        ? "md"
        : "xl";
      setSize(newSize);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gridFlow]);

  return {
    sortOrder,
    sortOption,
    gridFlow,
    size,
    handleSortOptionChange,
    handleSortOrderToggle,
    handleGridFlowChange,
  };
};
