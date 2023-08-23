import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {
  IoFileTrayStacked,
  IoLogOut,
  IoHeart,
  IoPerson,
} from "react-icons/io5";

const Pages = [
  { name: "My account", link: "/user", icon: IoPerson },
  { name: "Wishlist", link: "/user/wishlist", icon: IoHeart },
  { name: "Orders", link: "/user/orders", icon: IoFileTrayStacked },
];

export const UserNav = () => {
  const { pathname } = useRouter();
  const router = useRouter();

  const logout = async () => {
    await router.push("/");
    await signOut();
  };

  return (
    <>
      <aside className='md:w-64 w-full'>
        <nav className='flex h-full flex-col'>
          <ul className='menu w-full gap-2 md:w-56 rounded-box'>
            {Pages.map(({ name, link, icon }, index) => (
              <li key={index}>
                <Link
                  href={link}
                  className={`${
                    pathname === link.toLowerCase()
                      ? "bg-neutral text-neutral-content hover:bg-neutral-focus"
                      : ""
                  }`}
                >
                  {React.createElement(icon, { size: "22" })}
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={"/"} onClick={logout}>
                <IoLogOut size={22} />
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
