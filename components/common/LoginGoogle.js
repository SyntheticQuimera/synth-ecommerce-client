import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export const LoginGoogle = () => {
  const login = async () => {
    await signIn("google");
  };

  return (
    <button onClick={login} className='btn btn-lg btn-neutral'>
      <FcGoogle size={24} />
      Login with Google
    </button>
  );
};
