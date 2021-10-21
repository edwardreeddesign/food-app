import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setIsButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setIsButtonIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <StyledButton active={btnIsHighlighted} onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart </span>
      <span className="badge">{numberOfCartItems}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: #4d1601;
  color: #fff;
  padding: 0.75rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 2rem;
  font-weight: bold;
  animation: ${(props) => (props.active ? `bump 300ms ease-out` : "")};

  @keyframes bump {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover,
  &:active {
    background-color: #2c0d00;
  }

  .icon {
    width: 1.35rem;
    height: 1.35rem;
    margin-right: 0.5rem;
  }

  .badge {
    background-color: #b94517;
    padding: 0.25rem 1rem;
    border-radius: 2rem;
    margin-left: 1rem;
    font-weight: bold;

    &:hover,
    &:active {
      background-color: #92320c;
    }
  }
`;

export default HeaderCartButton;
