import React from "react";
import { Layout } from "@/components/common";
import { NewArrivalsRow } from "@/components/sections/NewArrivalsRow";
import { HighRatedRow } from "@/components/sections/HighRatedRow";
import { Featured } from "@/components/sections/Featured";
import fetchData from "@/lib/fetchData";

export default function Home({
  products,
  newArrivals,
  categories,
  subcategories,
  wishedProducts,
}) {
  return (
    <Layout categories={categories} subcategories={subcategories}>
      <Featured products={newArrivals} />
      <NewArrivalsRow products={newArrivals} wishedProducts={wishedProducts} />
      <HighRatedRow products={products} wishedProducts={wishedProducts} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData(context);

  return {
    props: {
      products: data.products,
      newArrivals: data.newArrivals,
      categories: data.categories,
      subcategories: data.subcategories,
      wishedProducts: data.wishedProducts,
    },
  };
}
