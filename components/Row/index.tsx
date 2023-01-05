import React from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import Movie from '../../types/Movie';
import Thumbnail from './ThumbNail';

type Props = {
  children?: React.ReactNode;
  title: string;
  movies: Movie[];
};

const Row = ({ title, movies }: Props) => {
  return movies.length ? (
    <div className="h-40 my-10">
      <h2 className="w-56 cursor-default font-semibold text-[#e5e5e5] text-lg">
        {title}
      </h2>
      <div className="relative group">
        <BsChevronLeft className="row-icons left-0 group-hover:opacity-100" />
        <div className="flex items-center gap-x-1 scrollbar-hide overflow-x-scroll md:gap-x-3">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <BsChevronRight className="row-icons right-0 group-hover:opacity-100" />
      </div>
    </div>
  ) : null;
};

export default Row;
