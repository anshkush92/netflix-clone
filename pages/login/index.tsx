import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

/* Rules to disable the warning when using <img /> instead of <Image /> */
/* eslint-disable @next/next/no-img-element */
const Login = () => {
  const [loginDetails, setLoginDetails] = useState<object | null>(null);

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt="Background Image netflix"
        src="https://rb.gy/p2hphi"
        fill
        className="-z-10 object-cover !hidden opacity-60 sm:!inline"
        style={{ objectFit: 'cover' }}
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        alt="Netlifx Logo"
        width={150}
        height={150}
      />

      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-4xl font-semibold">Login</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className={`input`} />
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className={`input`} />
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          type="submit"
        >
          Login
        </button>
        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            className="cursor-pointer text-white hover:underline"
            type="submit"
          >
            Register now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
