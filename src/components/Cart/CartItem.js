import React from "react";
import styled from "styled-components";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <StyledLi>
      <div>
        <h2>{props.name}</h2>
        <div className="summary">
          <span className="price">{price}</span>
          <span className="amount">x {props.amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </StyledLi>
  );
};

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #8a2b06;
  padding: 1rem 0;
  margin: 1rem 0;

  h2 {
    margin: 0 0 0.5rem 0;
    color: #363636;
  }

  .summary {
    width: 10rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .price {
    font-weight: bold;
    color: #8a2b06;
  }

  .amount {
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 0.25rem 0.75rem;
    border-radius: 0.2rem;
    color: #363636;
  }

  .actions {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .actions {
      flex-direction: row;
    }
  }

  button {
    font-weight: bold;
    font-size: 1.25rem;
    color: #8a2b06;
    border: 1px solid #8a2b06;
    width: 3rem;
    text-align: center;
    border-radius: 0.4rem;
    background-color: transparent;
    cursor: pointer;
    margin-left: 1rem;
    margin: 0.25rem;

    & button:hover,
    & button:active {
      background-color: #8a2b06;
      color: white;
    }
  }
`;

export default CartItem;
