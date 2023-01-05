import Image from 'next/image';
import React from 'react';

import { BASE_URL_IMAGE_ROWS } from '../../../utils/constants';
import Movie from '../../../types/Movie';

type Props = {
  movie: Movie;
};

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-32 min-w-[8rem] md:min-w-[14rem] cursor-pointer hover:z-[100] transition-all duration-200 ease-in-out">
      <Image
        className="rounded-sm object-cover md:rounded"
        src={`${BASE_URL_IMAGE_ROWS}${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt={movie?.title || 'default'}
        fill
      />
    </div>
  );
};

export default Thumbnail;
