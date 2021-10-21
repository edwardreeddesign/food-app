import React, { useRef, useState } from "react";
import styled from "styled-components";

import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  // onSubmit handler is not in the <form>
  return (
    <StyledForm onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5). </p>}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  text-align: right;

  button {
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: #fff;
    padding: 0.25rem 2rem;
    border-radius: 1.7rem;
    font-weight: bold;

    &:hover,
    &:active {
      background-color: #641e03;
      border-color: #641e03;
    }
  }
`;

export default MealItemForm;
