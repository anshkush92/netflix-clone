import { useEffect, useState } from 'react';

import { Modal } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';

import useModal from '../../hooks/useModal';
import Video from '../../types/Video';

const MovieModal = () => {
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const { movie, isModalOpen, closeModal } = useModal();

  useEffect(() => {
    if (!movie) return;

    /**
     * @function fetchMovieVideos - Fetches the Link of the Youtube Trailer of the Movie
     * @return Promise youtubeTrailerLink
     */
    const fetchMovieVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      const data = await res.json();
      const officialTrailer = data.results.filter(
        (video: Video) =>
          video.type === 'Trailer' && video.site === 'YouTube' && video.official
      );

      const youtubeTrailerLink = `https://www.youtube.com/watch?v=${officialTrailer[0].key}`;
      setVideoLink(youtubeTrailerLink);
    };

    fetchMovieVideos();
  }, [movie]);

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <div>
        <h2>{movie?.title}</h2>
        <p>{movie?.overview}</p>
        {videoLink && <a href={videoLink}>Trailer</a>}
        <button onClick={closeModal}>
          <AiFillCloseCircle className="h-8 w-8" />
        </button>
      </div>
    </Modal>
  );
};

export default MovieModal;
