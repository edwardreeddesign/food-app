import React, { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    // Implement Error handling here
    await fetch("https://meals-e97bb-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <StyledCart>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </StyledCart>
  );

  const modalActions = (
    <div className="actions">
      <button className="button-alt" onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <StyledCart>
        <div className="total">
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
        )}
        {!isCheckout && modalActions}
      </StyledCart>
    </>
  );

  const isSubmittingModalContent = (
    <StyledCart>
      <Spinner /> <p>Sending order data...</p>
    </StyledCart>
  );

  const didSubmitModalContent = (
    <StyledCart>
      <p>Successfully sent the Order!</p>
      <div className="actions">
        <button className="button" onClick={props.onClose}>
          Close
        </button>
      </div>
    </StyledCart>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

const StyledCart = styled.div`
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;

  li {
    list-style: none;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .actions {
    text-align: right;

    button {
      cursor: pointer;
      background-color: transparent;
      border: 1px solid #8a2b06;
      border-radius: 2rem;
      padding: 0.5rem 2rem;
      margin-left: 1rem;

      &:hover,
      &:active {
        background-color: #5a1a01;
        border-color: #5a1a01;
        color: #fff;
      }
    }

    .button-alt {
      color: #8a2b06;
    }

    .button {
      background-color: #8a2b06;
      color: #fff;
    }
  }
`;

export default Cart;
