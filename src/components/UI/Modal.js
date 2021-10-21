import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const BackDrop = (props) => {
  return <StyledBackdrop onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <StyledModal>
      <div className="content">{props.children}</div>
    </StyledModal>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

const StyledBackdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const StyledModal = styled.div`
  position: fixed;
  top: 10vh;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50%- 20rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-height: 350px) {
    width: 95%;
    height: 15rem;
    overflow: scroll;
  }
`;

export default Modal;
