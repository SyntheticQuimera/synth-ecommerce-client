import React, { useState, useEffect } from "react";
import { CardProduct, CardSorter, Layout, UserNav } from "@/components/common";
import fetchData from "@/lib/fetchData";
import { useSortAndGridFlow } from "@/hooks/useSortAndGridFlow";
import { Loading } from "@/components/common/Loading";
import { useSession } from "next-auth/react";
import { LoginGoogle } from "@/components/common/LoginGoogle";

export default function wishlist({ products, wishedProductsID }) {
  const [wishedProducts, setWishedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const {
    sortOrder,
    sortOption,
    size,
    handleSortOptionChange,
    handleSortOrderToggle,
    handleGridFlowChange,
  } = useSortAndGridFlow("date", true);

  useEffect(() => {
    setIsLoading(true);
    const filteredProducts = products.filter((product) =>
      wishedProductsID.includes(product._id)
    );
    setWishedProducts(filteredProducts);
    setIsLoading(false);
  }, [products, wishedProductsID]);

  if (session) {
    return (
      <Layout>
        <section className='section'>
          <div className='flex w-full flex-col md:flex-row gap-12'>
            <UserNav />
            <div className='w-full'>
              <CardSorter
                sortOrder={sortOrder}
                sortOption={sortOption}
                handleSortOptionChange={handleSortOptionChange}
                handleSortOrderToggle={handleSortOrderToggle}
                handleGridFlowChange={handleGridFlowChange}
              />
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className='gap-4 sm:gap-2 md:gap-4 flex justify-center md:justify-start flex-wrap'>
                    {wishedProducts?.length > 0 &&
                      wishedProducts?.map((product) => (
                        <CardProduct
                          key={product._id}
                          _id={product._id}
                          product={product}
                          title={product.title}
                          images={product.images[0]}
                          price={product.price}
                          size={size}
                          wished={wishedProductsID.includes(product._id)}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  return (
    <Layout>
      <section className='section grid place-content-center'>
        <LoginGoogle />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData(context);

  return {
    props: {
      products: data.products,
      wishedProductsID: data.wishedProducts,
    },
  };
}
