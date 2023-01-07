import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { useForm, SubmitHandler } from 'react-hook-form';

// Define the type of the form inputs
type Inputs = {
  email: string;
  password: string;
};

/* Rules to disable the warning when using <img /> instead of <Image /> */
/* eslint-disable @next/next/no-img-element */
const Login = () => {
  const [loginDetails, setLoginDetails] = useState<object | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log('🚀 ~ file: index.tsx:22 ~ Login ~ errors', errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login - Netlifx</title>
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

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-4 md:mt-0 md:max-w-md md:px-14"
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Login</h1>
        <div className="flex flex-col gap-y-4">
          <label className="w-full">
            {/* register your input into the hook by invoking the "register" function */}
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className={`input`}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="w-full">
            {/* register your input into the hook by invoking the "register" function */}
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className={`input`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
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
