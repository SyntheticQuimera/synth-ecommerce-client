import { useSortAndGridFlow } from "@/hooks/useSortAndGridFlow";
import React from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoGrid,
  IoReorderFour,
} from "react-icons/io5";

export const CardSorter = ({
  sortOrder,
  sortOption,
  handleSortOptionChange,
  handleSortOrderToggle,
  handleGridFlowChange,
}) => {
  return (
    <nav className='flex justify-between w-full items-center p-4'>
      <div className='flex gap-4 h-full'>
        <button
          onClick={() => handleGridFlowChange(true)}
          className='btn btn-square'
        >
          <IoGrid size={22} />
        </button>
        <button
          onClick={() => handleGridFlowChange(false)}
          className='btn btn-square'
        >
          <IoReorderFour size={22} />
        </button>
      </div>
      <div className='flex gap-2 items-center h-full'>
        <button
          onClick={handleSortOrderToggle}
          className='btn btn-square btn-ghost'
        >
          {sortOrder ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
        </button>
        <select
          className='select select-ghost focus:outline-none'
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value='date'>Date</option>
          <option value='name'>Name</option>
          <option value='price'>Price</option>
        </select>
      </div>
    </nav>
  );
};
