import { useState, useEffect } from 'react';
import Image from 'next/image';

import { BASE_URL_IMAGE } from '../../utils/constants';
import Movie from '../../types/Movie';

type Props = {
  netflixOriginals: Movie[];
};

const Banner = ({ netflixOriginals }: Props) => {
  // Either the state can of the type Movie or null
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    /**
     * @function {setMovie} - Sets the state to the random movie from the Netflix Originals
     * @description {useEffect} - To get the random movie from the Netflix Originals, runs every time netflix originals changes
     */
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  console.log(movie);

  return (
    <div>
      {/* Container for the <Image /> */}
      <div className="absolute top-0 left-0 h-[95vh] -z-10 w-full">
        {/* When using the layout="fill", the parent should be "absolute" or "relative" */}
        <Image
          src={`${BASE_URL_IMAGE}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title || 'default'}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div>
        <h1>{movie?.title}</h1>
      </div>
    </div>
  );
};

export default Banner;
