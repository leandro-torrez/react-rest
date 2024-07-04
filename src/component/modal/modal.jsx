import React from "react";
import "./Modal.css";
import { useModal } from "../../context/modalContext";

const Modal = ({ message }) => {
  const { closeModal } = useModal()

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Mensagem</h2>
          <button className="close-button" onClick={closeModal}>
            Fechar
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
