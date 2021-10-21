import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return <StyledSpinner />;
};

export default Spinner;

export const StyledSpinner = styled.div`
  border: 5px solid lightgrey;
  border-top: 5px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 800ms linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
