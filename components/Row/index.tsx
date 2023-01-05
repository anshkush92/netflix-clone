import React from 'react';

import Movie from '../../types/Movie';

type Props = {
  children?: React.ReactNode;
  title: string;
  movies: Movie[];
};

const Row = (props: Props) => {
  return <div>Row</div>;
};

export default Row;
