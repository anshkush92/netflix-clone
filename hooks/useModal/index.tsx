import { useContext } from 'react';
import ModalContext from '../../contexts/modal';

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
