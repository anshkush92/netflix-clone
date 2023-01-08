import { useEffect, useState } from 'react';

import { Modal } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';

import { BASE_URL } from '../../utils/constants';
import useModal from '../../hooks/useModal';
import Video from '../../types/Video';
import MovieDetails from '../../types/MovieDetails';

const MovieModal = () => {
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const { movie, isModalOpen, closeModal } = useModal();

  console.log(videoLink, movieDetails);

  useEffect(() => {
    if (!movie) {
      setVideoLink(null);
      setMovieDetails(null);
      return;
    }

    /**
     * @function fetchMovieVideos - Fetches the Link of the Youtube Trailer of the Movie
     * @return Promise youtubeTrailerLink
     */
    const fetchMovieVideos = async () => {
      const res = await fetch(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      const data = await res.json();
      const officialTrailer = data.results.filter(
        (video: Video) =>
          video.type === 'Trailer' && video.site === 'YouTube' && video.official
      );

      const youtubeTrailerLink = `https://www.youtube.com/watch?v=${officialTrailer[0].key}`;
      setVideoLink(youtubeTrailerLink);
    };

    const fetchMovieDetails = async () => {
      const res = await fetch(
        `${BASE_URL}/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      const data = await res.json();
      setMovieDetails(data);
    };

    fetchMovieVideos();
    fetchMovieDetails();
  }, [movie]);

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <div>
        <h2>{movie?.title}</h2>
        <p>{movie?.overview}</p>
        {videoLink && (
          <a href={videoLink} target="_blank" rel="noreferrer">
            {videoLink}
          </a>
        )}
        <button onClick={closeModal}>
          <AiFillCloseCircle className="h-8 w-8" />
        </button>
      </div>
    </Modal>
  );
};

export default MovieModal;
