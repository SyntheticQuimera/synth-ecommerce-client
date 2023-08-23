import React from "react";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";

export const Layout = ({ children, categories, subcategories }) => {
  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Header categories={categories} subcategories={subcategories} />
      {children}
      <Footer />
    </div>
  );
};
