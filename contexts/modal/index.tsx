import { DocumentData } from 'firebase/firestore';
import { createContext } from 'react';
import Movie from '../../types/Movie';

type ModalContextType = {
  movie: Movie | DocumentData | null;
  isModalOpen: boolean;
  openModal: (movie: Movie | DocumentData) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  movie: null,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
