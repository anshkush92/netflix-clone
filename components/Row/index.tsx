import { useRef, useState } from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import Movie from '../../types/Movie';
import Thumbnail from './ThumbNail';

type Props = {
  // When using the firebase, then we will be getting some movie data
  // movie: Movie | DocumentData[];
  children?: React.ReactNode;
  title: string;
  movies: Movie[];
};

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);

  /**
   * @function {handleScroll} - Handle the scroll of the row
   * @param {string} direction - The direction of the scroll
   */
  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      // Current scroll left - 0 at starting and client width - <div> width
      const { scrollLeft, clientWidth } = rowRef.current;

      // Current position of the starting point of the caraousel
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      // Position of the scrollLeft: scrollTo
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return movies.length ? (
    <div className="h-40">
      <h2 className="w-56 cursor-default font-semibold text-[#e5e5e5] text-lg">
        {title}
      </h2>
      <div className="relative group">
        <BsChevronLeft
          className="row-icons left-0 group-hover:opacity-100"
          onClick={() => handleScroll('left')}
        />
        <div
          ref={rowRef}
          className="flex items-center gap-x-1 scrollbar-hide overflow-x-scroll overflow-y-hidden md:gap-x-3"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <BsChevronRight
          className="row-icons right-0 group-hover:opacity-100"
          onClick={() => handleScroll('right')}
        />
      </div>
    </div>
  ) : null;
};

export default Row;
