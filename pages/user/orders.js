import { Layout, UserNav } from "@/components/common";
import { Loading } from "@/components/common/Loading";
import axios from "axios";
import React, { useState } from "react";

export default function orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  axios.get("/api/orders").then((response) => {
    setIsLoading(true);
    setOrders(response.data);
    setIsLoading(false);
  });

  return (
    <Layout>
      <section className='section'>
        <div className='flex w-full flex-col md:flex-row gap-12'>
          <UserNav />
          {isLoading ? (
            <Loading />
          ) : (
            <div className='overflow-x-scroll'>
              <table className='table w-full'>
                {/* head */}
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Recipient</th>
                    <th>Products</th>
                  </tr>
                </thead>
                {/* body */}
                <tbody>
                  {orders?.map((order) => (
                    <tr>
                      <td>
                        <div className='font-bold'>
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </td>
                      <td>
                        <div className='font-bold'>
                          {order.name}, {order.email}
                        </div>
                        <div className='break-words text-xs md:text-sm'>
                          {order.country},{order.city},{order.streetAddress},
                          {order.postalCode}
                        </div>
                      </td>
                      <td className='flex flex-col gap-2'>
                        {order?.line_items?.map((product) => (
                          <div className='flex w-fit rounded-xl bg-warning px-2 py-1 text-xs text-warning-content sm:text-sm'>
                            {product.price_data.product_data.name}
                            <div className='pl-2 font-semibold'>
                              x{product.quantity}
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>Date</th>
                    <th>Recipient</th>
                    <th>Products</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
