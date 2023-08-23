import { Layout, UserForm, UserNav } from "@/components/common";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { LoginGoogle } from "@/components/common/LoginGoogle";

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const { data: session } = useSession();

  const saveAddress = (data) => {
    axios.put("api/address", data);
  };

  useEffect(() => {
    if (session) {
      axios.get("/api/address").then((response) => {
        setUserData(response.data);
      });
    }
  }, []);

  const { name, email, city, postalCode, streetAddress, country } = userData;

  if (session) {
    return (
      <Layout>
        <section className='section'>
          <div className='flex w-full flex-col md:flex-row gap-14'>
            <UserNav />
            <UserForm Title='User Information' handleDataSubmit={saveAddress} />
            {/* {isEditing ? (
              <UserForm
                Title='User Information'
                handleDataSubmit={saveAddress}
              />
            ) : (
              <div className='overflow-x-auto flex flex-col lg:flex-row gap-4'>
                <div className='avatar'>
                  <div className='mask mask-circle bg-slate-400 w-16 h-16'>
                    <img
                      src='/Airpods.png'
                      alt='Avatar'
                      className='object-contain'
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <table className='table w-full'>
                    <tbody>
                      <tr>
                        <td>
                          <div className='font-bold'>Name:</div>
                        </td>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <td>
                          <div className='font-bold'>Email:</div>
                        </td>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <td>
                          <div className='font-bold'>Country:</div>
                        </td>
                        <td>{country}</td>
                      </tr>
                      <tr>
                        <td>
                          <div className='font-bold'>City:</div>
                        </td>
                        <td>{city}</td>
                      </tr>
                      <tr>
                        <td>
                          <div className='font-bold'>Street Address:</div>
                        </td>
                        <td>{streetAddress}</td>
                      </tr>
                      <tr>
                        <td>
                          <div className='font-bold'>Postal Code:</div>
                        </td>
                        <td>{postalCode}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='btn btn-secondary btn-sm w-full'
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            )} */}
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
