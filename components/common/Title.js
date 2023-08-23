import React from "react";

export const Title = ({ title, className }) => {
  return (
    <div className={`w-full text-center md:text-start p-6 ${className}`}>
      <h1 className='text-2xl md:text-3xl font-bold'>{title}</h1>
    </div>
  );
};
