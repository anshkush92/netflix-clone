import React from 'react';

import ModalContext from '../../contexts/modal/index';

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  return <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
