import React from "react";
import styled from "styled-components";

const Card = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};

const StyledCard = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 1.1rem;
  background-color: #fff;
`;
export default Card;
