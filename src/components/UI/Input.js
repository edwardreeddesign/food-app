import React from "react";
import styled from "styled-components";

const Input = React.forwardRef((props, ref) => {
  return (
    <StyledInput>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </StyledInput>
  );
});

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  label {
    font-weight: bold;
    margin-right: 1rem;
  }

  input {
    width: 3rem;
    border-radius: 0.3rem;
    border: 1px solid #ccc;
    padding-left: 0.5rem;

    &:focus {
      outline: none;
    }
  }
`;
export default Input;
