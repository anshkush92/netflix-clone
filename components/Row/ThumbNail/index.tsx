import Image from 'next/image';
import React from 'react';

import { BASE_URL_IMAGE_ROWS } from '../../../utils/constants';
import Movie from '../../../types/Movie';

type Props = {
  // When using the firebase, then we will be getting some movie data
  // movie: Movie | DocumentData;
  movie: Movie;
};

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-32 min-w-[8rem] overflow-y-visible md:min-w-[14rem] cursor-pointer  hover:z-[100] transition-all duration-200 ease-in-out">
      <Image
        className="rounded-sm object-cover md:rounded h-full w-full"
        src={`${BASE_URL_IMAGE_ROWS}${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt={movie?.title || 'default'}
        height={1080}
        width={1920}
      />
    </div>
  );
};

export default Thumbnail;
