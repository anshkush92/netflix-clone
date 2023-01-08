import { useEffect, useState } from 'react';
import Image from 'next/image';

import { BASE_URL_IMAGE_ROWS } from '../../utils/constants';
import { Modal } from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import {
  AiFillPauseCircle,
  AiFillCloseCircle,
  AiFillPlayCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';

import {
  BsFillHandThumbsUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';

import { BASE_URL } from '../../utils/constants';
import useModal from '../../hooks/useModal';
import Video from '../../types/Video';
import MovieDetails from '../../types/MovieDetails';

const MovieModal = () => {
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { movie, isModalOpen, closeModal } = useModal();

  useEffect(() => {
    if (!movie) {
      setVideoLink(null);
      setMovieDetails(null);
      return;
    }

    /**
     * @function fetc hMovieVideos - Fetches the Link of the Youtube Trailer of the Movie
     * @return Promise
     */
    const fetchMovieVideos = async () => {
      const res = await fetch(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      const data = await res.json();
      const officialTrailer = await data.results.filter(
        (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
      );

      const youtubeTrailerLink = await (officialTrailer.length &&
        `https://www.youtube.com/watch?v=${officialTrailer[0]?.key}`);

      setVideoLink(youtubeTrailerLink);
    };

    /**
     * @function fetchMovieDetails - Fetches the details of the movie
     * @return Promise
     */
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
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide md:pb-10"
    >
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={closeModal}
        >
          <AiFillCloseCircle className="h-8 w-8" />
        </button>

        <div className="relative pt-[56.25%]">
          {videoLink ? (
            <ReactPlayer
              url={videoLink}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing={isPlaying}
              muted={isMuted}
              controls
            />
          ) : (
            <div className="w-full h-full absolute flex items-center justify-center top-0 left-0 bg-[#181818]">
              {' '}
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
          )}
          {videoLink && (
            <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
              <div className="flex space-x-2">
                <button
                  className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                  onClick={() => setIsPlaying((prvSt) => !prvSt)}
                >
                  {!isPlaying ? (
                    <>
                      <AiFillPlayCircle className="h-7 w-7 text-black" />
                      Play
                    </>
                  ) : (
                    <>
                      <AiFillPauseCircle className="h-7 w-7 text-black" />
                      Pause
                    </>
                  )}
                </button>
                <button className="modalButton">
                  <AiOutlinePlusCircle className="h-7 w-7" />
                </button>
                <button className="modalButton">
                  <BsFillHandThumbsUpFill className="h-6 w-6" />
                </button>
              </div>
              <button
                className="modalButton"
                onClick={() => setIsMuted((prvSt) => !prvSt)}
              >
                {isMuted ? (
                  <BsFillVolumeMuteFill className="h-6 w-6" />
                ) : (
                  <BsFillVolumeUpFill className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">{movie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {movieDetails?.genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default MovieModal;
