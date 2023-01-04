import { useState, useEffect } from 'react';

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

  return <div>Banner</div>;
};

export default Banner;
