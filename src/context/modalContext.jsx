import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, openModal, closeModal, modalContent }}>
      {children}
      {showModal && modalContent}
    </ModalContext.Provider>
  );
};