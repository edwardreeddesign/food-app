import React from "react";
import styled from "styled-components";

const Error = (props) => {
  return (
    <StyledError>
      <p>{props.children}</p>
    </StyledError>
  );
};

const StyledError = styled.div`
  text-align: center;
  color: #f30707;
  font-size: 2rem;
`;
export default Error;
