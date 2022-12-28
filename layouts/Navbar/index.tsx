import Link from 'next/link';
import React from 'react';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';

import { navbarLinks } from '../../utils/constants';

/* Rules to disable the warning when using <img /> instead of <Image /> */
/* eslint-disable @next/next/no-img-element */
export const Navbar = () => {
  return (
    <header className="navbar">
      {/* Left Section of the Navbar */}
      <div className="flex items-center gap-x-5 md:gap-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="Netflix Logo"
          width={100}
          height={100}
          className="object-contain"
        />

        <ul className="hidden md:flex gap-x-5">
          {navbarLinks.map((link, index) => (
            <li key={index} className="navbarLinks">
              {link}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section of the Navbar */}
      <div className="flex items-center gap-x-4 text-sm font-light">
        <AiOutlineSearch className="hidden sm:inline w-6 h-6" />
        <p className="hidden lg:inline">Kids</p>
        <AiOutlineBell className="w-6 h-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
};
