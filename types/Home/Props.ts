import Movie from '../Movie';

/**
 * @description {Props} - The types of the props for the Home component.
 */
type Props = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
};

export default Props;
