import React from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import Movie from '../../types/Movie';

type Props = {
  children?: React.ReactNode;
  title: string;
  movies: Movie[];
};

const Row = ({ title, movies }: Props) => {
  return (
    <div className="h-60">
      <h2 className="w-56 cursor-pointer font-semibold text-[#e5e5e5]">
        {title}
      </h2>
      <div className="relative group">
        <BsChevronLeft className="row-icons left-0 group-hover:opacity-100" />
        <BsChevronRight className="row-icons right-0 group-hover:opacity-100" />
        Results
      </div>
    </div>
  );
};

export default Row;
